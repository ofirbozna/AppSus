export function RateByTextbox({ val, onSelect }) {
  return <input className="rate-textbox" type="number" min="1" max="5" value={val} onChange={(e) => onSelect(Math.min(5, Math.max(1, +e.target.value)))} />
}
