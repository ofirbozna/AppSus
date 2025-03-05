import { bookService } from '../services/book.service.js'
import { GoogleBooksList } from './GoogleBooksList.jsx'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouter

export function AddGoogleBook() {
  const [search, setSearch] = useState('')
  const [googleBookList, setGoogleBooksList] = useState([])
  console.log('googleBookList:', googleBookList)

  const navigate = useNavigate()
  const searchBooksDebounce = useRef(utilService.debounce(searchBooks, 1500))

  useEffect(() => {
    // searchBooks(search)
    searchBooksDebounce.current(search)
  }, [search])

  function handleSearch({ target }) {
    setSearch(target.value)
  }

  function searchBooks(search) {
    // console.log('searchBooks')
    bookService
      .getGoogleBooks(search)
      .then((books) => setGoogleBooksList(books))
  }

  function onSubmitForm(ev) {
    ev.preventDefault()
    searchBooks(search)
  }

  function onSave(book) {
    bookService
      .addGoogleBook(book)
      .then(() => showSuccessMsg('Book has successfully been added!'))
      .catch((err) => showErrorMsg(err))
      .finally(() => navigate('/book'))
  }

  return (
    <div className="book-search">
      <div className="add-book-title">
        <form onSubmit={onSubmitForm}>
          <label htmlFor="add-book" className="bold-txt">
            Google Search:{' '}
          </label>
          <input
            className="book-input"
            value={search}
            onChange={handleSearch}
            type="text"
            name="title"
            placeholder="Insert book name"
            id="add-book"
          />
          <button className="book-btn">Search</button>
        </form>
      </div>
      {googleBookList && (
        <GoogleBooksList booksList={googleBookList} onSave={onSave} />
      )}
    </div>
  )
}
