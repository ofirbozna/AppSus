import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <section>
      <h2 className="list-header">Book List:</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            {/* Move ribbon here */}
            {book.listPrice.isOnSale && (
              <div className="ribbon">
                <span>On Sale</span>
              </div>
            )}

            <BookPreview book={book} />
            <section className="book-list-section">
              <div className="book-actions">
                <Link to={`/book/${book.id}`}>Details</Link>
                <button
                  className="remove-btn book-btn"
                  onClick={() => onRemoveBook(book.id)}
                >
                  Remove
                </button>
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
