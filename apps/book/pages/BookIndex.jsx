import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [filterBy, setFilterBy] = useState(
    bookService.getDefaultSearchParams(searchParams)
  )
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    setSearchParams(filterBy)
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      // console.log(filterBy)

      // console.log('books', books)

      setBooks(books)
    })
  }
  function onSetSelectedBookId(bookId) {
    setSelectedBookId(bookId)
  }
  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
  }
  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBook) => prevBook.filter((book) => book.id !== bookId))

        showSuccessMsg('Book Removed')
      })
      .catch((err) => {
        console.log('Problem removing book', err)
        showErrorMsg('Problems removing book')
      })
  }

  if (!books)
    return (
      <div className="loader">
        <div className="book">
          <div className="page"></div>
          <div className="page page2"></div>
        </div>
      </div>
    )
  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <Link to="/book/edit" className="link-add-book">
        Add book
      </Link>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
