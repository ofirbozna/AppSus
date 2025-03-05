const { useState } = React

export function LongTxt({ book }) {
  let isLong = book.description.length > 100
  const [fullDescription, setFullDescription] = useState(false)
  function showMoreDescrip() {
    setFullDescription((prevState) => !prevState)
  }

  return (
    <p className="book-description">
      <strong>Description:</strong>{' '}
      {fullDescription
        ? book.description
        : `${book.description.substring(0, 100)}${isLong ? '...' : ''}`}
      {isLong && (
        <button className="read-more book-btn" onClick={showMoreDescrip}>
          {fullDescription ? ' Show Less' : ' Read More'}
        </button>
      )}
    </p>
  )
}
