import { bookService } from '../services/book.service.js'
import { BookReview } from '../cmps/BookReview.jsx'
import { AddBookReview } from '../cmps/AddBookReview.jsx'
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  console.log(book)

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log('Problem getting book:', book)
      })
  }
  function getPriceClass() {
    let price = book.listPrice.amount

    if (book.listPrice.isOnSale) {
      price = getDiscountedPrice(price)
    }

    if (price > 100) return 'high-price'
    else if (price < 50) return 'low-price'
    return ''
  }

  function getDiscountedPrice(amount) {
    return (amount * 0.5).toFixed(2).replace(/\.00$/, '')
  }

  function getPublishDate() {
    const currYear = new Date().getFullYear()
    let publishedYear = book.publishedDate
    let publishDateTxt = ''
    let diff = currYear - publishedYear
    if (publishedYear === null) return
    else if (diff > 10) publishDateTxt = ' - Vintage'
    else if (diff < 3) publishDateTxt = ' - NEW!'
    return publishDateTxt
  }

  function getPageCount() {
    let pageCount = ''
    if (book.pageCount > 500) pageCount = ' - Long reading'
    else if (book.pageCount > 200) pageCount = ' - Decent reading'
    else if (book.pageCount > 0) pageCount = ' - Light reading'
    else if (book.pageCount === null) return
    return pageCount
  }
  function onDeleteReview(reviewId) {
    const updatedBook = { ...book }
    updatedBook.reviews = updatedBook.reviews.filter(
      (review) => review.id !== reviewId
    )

    bookService
      .save(updatedBook)
      .then(() => {
        setBook(updatedBook)
        showSuccessMsg('Review deleted')
      })
      .catch((err) => {
        console.log('Error deleting review:', err)
        showErrorMsg('Problem deleting review')
      })
  }

  if (!book)
    return (
      <div className="loader">
        <div className="book">
          <div className="page"></div>
          <div className="page page2"></div>
        </div>
      </div>
    )

  return (
    <React.Fragment>
      <section className="book-details">
        <h2 className="title-detail">
          {book && book.title ? book.title.toUpperCase() : 'Untitled'}
        </h2>
        <h3 className="subtitle-detail">
          {book && book.subtitle ? book.subtitle : 'No subtitle available'}
        </h3>

        <div className="thumbnail-detail">
          <img src={book.thumbnail} alt="Book cover" />
        </div>

        <div className="book-info">
          <p className="authors-detail">
            <strong>Author(s):</strong>{' '}
            {book.authors
              ? Array.isArray(book.authors)
                ? book.authors.join(', ')
                : book.authors
              : 'Unknown'}
          </p>
          <p className="publishedDate-detail">
            <span className="book-details-info-title"> Year publish: </span>
            <span className="book-details-info-publishDate">
              {' '}
              {book.publishedDate}:
            </span>
            <span className="book-details-info-text">{getPublishDate()}</span>
          </p>
          <p className="language-detail">
            <strong>Language:</strong> {book.language.toUpperCase()}
          </p>
          <p className="categories-detail">
            <strong>Category:</strong>{' '}
            {book.categories
              ? Array.isArray(book.categories)
                ? book.categories.join(', ')
                : book.categories
              : 'Uncategorized'}
          </p>
          <p className="pageCount-detail">
            <span className="book-details-info-title">Pages: </span>
            <span className="book-details-info-pageCount">
              {book.pageCount}
            </span>
            <span className="book-details-info-text">{getPageCount()}</span>
          </p>
          <p className="description-detail">
            <strong>Description:</strong> {book.description}
          </p>
        </div>

        <div className="price-detail">
          {book.listPrice.isOnSale ? (
            <div className="price-wrapper">
              <p className="amount original-price--detail">
                {book.listPrice.amount} {book.listPrice.currencyCode}
              </p>
              <span className="discount-label-detail">-50%</span>
              <p
                className={'amount discounted-price-detail ' + getPriceClass()}
              >
                {getDiscountedPrice(book.listPrice.amount)}{' '}
                {book.listPrice.currencyCode}
              </p>
            </div>
          ) : (
            <p className={'amount ' + getPriceClass()}>
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
          )}
        </div>

        {book.listPrice.isOnSale && (
          <div className="ribbon">
            <span>On Sale</span>
          </div>
        )}

        <nav className="book-details-nav">
          <Link to={`/book/${book.prevBookId}`}>
            <button className="book-btn">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
          <Link className="back-btn" to="/book">
            Back
          </Link>
          <Link to={`/book/${book.nextBookId}`}>
            <button className="book-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </nav>
      </section>

      <section className="book-review-container">
        <AddBookReview book={book} setBook={setBook} />
        <h4 className="reviews-header">Reviews</h4>
        <BookReview
          book={book}
          setBook={setBook}
          onDeleteReview={onDeleteReview}
        />
      </section>
    </React.Fragment>
  )
}
