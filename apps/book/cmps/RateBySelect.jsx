export function RateBySelect({ val, onSelect }) {
  return (
    <select className="rate-select" value={val} onChange={(e) => onSelect(+e.target.value)}>
      <option value="1">⭐</option>
      <option value="2">⭐⭐</option>
      <option value="3">⭐⭐⭐</option>
      <option value="4">⭐⭐⭐⭐</option>
      <option value="5">⭐⭐⭐⭐⭐</option>
    </select>
  )
}
