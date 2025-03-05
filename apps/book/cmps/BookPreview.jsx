import { LongTxt } from './LongTxt.jsx'

export function BookPreview({ book }) {
  const originalPrice = book.listPrice.amount
  const discountedPrice = (originalPrice * 0.5).toFixed(2).replace(/\.00$/, '')

  return (
    <section className="book-preview">
      <img className="book-thumbnail" src={book.thumbnail} alt={book.title} />

      <h4 className="book-title">Title: {book.title}</h4>
      <LongTxt book={book} />

      {book.listPrice.isOnSale ? (
        <p className="book-price">
          <span className="original-price">
            {originalPrice} {book.listPrice.currencyCode}
          </span>
          <br />
          <span className="discounted-price">
            {discountedPrice} {book.listPrice.currencyCode}
          </span>
        </p>
      ) : (
        <p className="book-price">
          {originalPrice} {book.listPrice.currencyCode}
        </p>
      )}
    </section>
  )
}
