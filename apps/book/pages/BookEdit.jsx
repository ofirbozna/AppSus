import { bookService } from '../services/book.service.js'
import { AddGoogleBook } from '../cmps/AddGoogleBook.jsx'

import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  console.log(bookToEdit)

  const categoryOptions = [
    'Computers',
    'Science',
    'History',
    'Fantasy',
    'Romance',
    'Horror',
    'Mystery',
    'Self-Help',
    'Biography',
    'Poetry',
    'Thriller',
    'Adventure',
    'Young Adult',
    'Science Fiction',
    'Philosophy',
    'Psychology',
    'Health & Wellness',
  ]

  const {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    language,
    thumbnail,
    listPrice,
  } = bookToEdit
  const { amount: price, currencyCode, isOnSale } = bookToEdit.listPrice || {}

  const navigate = useNavigate()

  // const params = useParams()
  // console.log(params)
  const { bookId } = useParams()
  console.log(bookId)

  useEffect(() => {
    if (bookId) loadBooks()
  }, [])
  function loadBooks() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('Problem get book', err))
  }
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (field === 'price') {
      setBookToEdit((prevBookToEdit) => ({
        ...prevBookToEdit,
        listPrice: { ...prevBookToEdit.listPrice, amount: value },
      }))
      return
    }

    if (field === 'categories') {
      value = target.value
    }

    if (field === 'authors') {
      value = value.split(',').map((item) => item.trim())
    }

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }

    setBookToEdit((prevBookToEdit) => {
      if (field === 'currencyCode' || field === 'isOnSale') {
        return {
          ...prevBookToEdit,
          listPrice: { ...prevBookToEdit.listPrice, [field]: value },
        }
      }
      return { ...prevBookToEdit, [field]: value }
    })
  }

  function onSubmitBook(ev) {
    ev.preventDefault()
    const bookToSave = {
      ...bookToEdit,
      listPrice: {
        ...bookToEdit.listPrice,
        amount: +bookToEdit.listPrice.amount,
      },
    }

    bookService
      .save(bookToSave)
      .then((savedBook) => {
        console.log('Saved book:', savedBook)
        showSuccessMsg('Book Saved')
        navigate('/book')
      })
      .catch((err) => {
        showErrorMsg('Problem saving')
        console.log('There is a problem:', err)
      })
  }

  return (
    <section className="edit-container">
      <h2>{bookId ? 'Edit book' : 'Add book'}</h2>

      {!bookId && <AddGoogleBook />}
      <form onSubmit={onSubmitBook}>
        <label htmlFor="title">Title</label>
        <input
          className="book-input"
          name="title"
          type="text"
          id="title"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="subtitle">Subtitle</label>
        <input
          className="book-input"
          name="subtitle"
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={handleChange}
        />

        <label htmlFor="authors">Authors</label>
        <input
          className="book-input"
          name="authors"
          type="text"
          id="authors"
          value={bookToEdit && Array.isArray(authors) ? authors.join(', ') : ''}
          onChange={handleChange}
        />

        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          id="categories"
          value={categories}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="publishedDate">Published Year</label>
        <input
          className="book-input"
          name="publishedDate"
          type="number"
          id="publishedDate"
          value={publishedDate}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="pageCount">Page Count</label>
        <input
          className="book-input"
          name="pageCount"
          type="number"
          id="pageCount"
          value={pageCount}
          onChange={handleChange}
        />

        <label htmlFor="language">Language</label>
        <input
          className="book-input"
          name="language"
          type="text"
          id="language"
          value={language}
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          className="book-input"
          name="price"
          type="text"
          id="price"
          value={listPrice.amount}
          onChange={handleChange}
        />

        <label htmlFor="currencyCode">Currency</label>
        <select
          name="currencyCode"
          id="currencyCode"
          value={listPrice.currencyCode}
          onChange={handleChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ILS">ILS</option>
        </select>

        <label htmlFor="isOnSale">
          <input
            className="book-input"
            type="checkbox"
            name="isOnSale"
            id="isOnSale"
            checked={bookToEdit && listPrice ? isOnSale : false}
            onChange={handleChange}
          />
          On Sale
        </label>

        <button className="book-btn">Submit</button>
        <Link className="back-btn" to="/book">
          Back
        </Link>
      </form>
    </section>
  )
}
