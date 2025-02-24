const { useState } = React
export function ColorPicker({ selectedColor, onColorSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const colors = ['#ffcc80', '#80deea', '#ff8a80', '#a0c78c', '#e6b800', '#ffffff1a']

  function handleToggleClick(ev) {
    ev.stopPropagation()
    setIsOpen(!isOpen)
  }

  function handleColorSelect(color, ev) {
    ev.stopPropagation()
    onColorSelect(color)
    setIsOpen(false)
  }

  return (
    <div className="color-picker" onClick={(ev) => ev.stopPropagation()}>
      <button type="button" className="color-picker-toggle" onClick={handleToggleClick}>
        🎨 Pick Color
      </button>

      {isOpen && (
        <div className="color-picker-buttons" onClick={(ev) => ev.stopPropagation()}>
          {colors.map((color) => (
            <button type="button" key={color} className={`color-button ${selectedColor === color ? 'selected' : ''}`} style={{ backgroundColor: color }} onClick={(ev) => handleColorSelect(color, ev)}></button>
          ))}
        </div>
      )}
    </div>
  )
}
