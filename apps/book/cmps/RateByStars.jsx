export function RateByStars({ val, onSelect }) {
  return (
    <div className="rate-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= val ? 'selected' : 'unselected'} onClick={() => onSelect(star)}>
          ★
        </span>
      ))}
    </div>
  )
}
