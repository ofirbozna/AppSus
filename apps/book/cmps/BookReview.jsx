export function BookReview({ book, onDeleteReview }) {
  return (
    <section className="reviews-container">
      {book.reviews && book.reviews.length > 0 ? (
        book.reviews.map((rev, index) => (
          <div className="review-card" key={index}>
            <p className="review-name">Name: {rev.name}</p>
            <p className="review-rating">{'⭐'.repeat(rev.rating)}</p>
            <p className="review-txt">{rev.review}</p>
            <small className="review-date">Read at {rev.readAt}</small>
            <button
              className="review-dlt-btn book-btn"
              onClick={() => onDeleteReview(rev.id)}
            >
              X
            </button>
          </div>
        ))
      ) : (
        <p className="no-review-p">No reviews yet. Be the first to add one!</p>
      )}
    </section>
  )
}
