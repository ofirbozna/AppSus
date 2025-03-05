export function GoogleBooksList({ booksList, onSave }) {
  return (
    <ul className="google-search-list">
      {booksList.map((book) => (
        <li key={book.id}>
          <span>{book.title}</span>
          <button className="book-btn" onClick={() => onSave(book)}>
            +
          </button>
        </li>
      ))}
    </ul>
  )
}
