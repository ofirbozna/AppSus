const { useState, useRef, useEffect } = React
import { bookService } from '../services/book.service.js'
import { utilService } from '../../../services/util.service.js'
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

export function AddBookReview({ book, setBook }) {
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [ratingType, setRatingType] = useState('select')

  const onSubmitReview = (e) => {
    e.preventDefault()
    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year}`

    const newReview = {
      id: utilService.makeId(),
      name,
      review,
      rating,
      readAt: formattedDate,
    }

    const updatedBook = { ...book }
    if (!updatedBook.reviews) updatedBook.reviews = []
    updatedBook.reviews.push(newReview)

    bookService
      .save(updatedBook)
      .then(() => {
        setBook(updatedBook)
        showSuccessMsg('Review added')
      })
      .catch((err) => {
        console.log('review add err', err)
        showErrorMsg('Problem add review')
      })

    setName('')
    setReview('')
    setRating(5)
    setDate('')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section>
      <form className="add-review-container" onSubmit={onSubmitReview}>
        <h4>Add Review</h4>
        <label htmlFor="name">Enter your name</label>
        <input
          className="book-input"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="review">Add your review</label>
        <textarea
          name="review"
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <label htmlFor="date">Read at</label>
        <input
          className="book-input"
          type="date"
          id="date"
          name="date"
          max={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <fieldset className="rating-container">
          <legend>Choose Rating Method</legend>
          <label>
            <input
              className="book-input"
              type="radio"
              name="ratingType"
              value="select"
              checked={ratingType === 'select'}
              onChange={() => setRatingType('select')}
            />
            Select
          </label>
          <label>
            <input
              className="book-input"
              type="radio"
              name="ratingType"
              value="textbox"
              checked={ratingType === 'textbox'}
              onChange={() => setRatingType('textbox')}
            />
            Textbox
          </label>
          <label>
            <input
              className="book-input"
              type="radio"
              name="ratingType"
              value="stars"
              checked={ratingType === 'stars'}
              onChange={() => setRatingType('stars')}
            />
            Stars
          </label>
        </fieldset>

        <h3 className="" htmlFor="rating">
          Rate
        </h3>
        {ratingType === 'select' && (
          <RateBySelect val={rating} onSelect={setRating} />
        )}
        {ratingType === 'textbox' && (
          <RateByTextbox val={rating} onSelect={setRating} />
        )}
        {ratingType === 'stars' && (
          <RateByStars val={rating} onSelect={setRating} />
        )}

        <button className="book-btn" type="submit">
          Save
        </button>
      </form>
    </section>
  )
}
