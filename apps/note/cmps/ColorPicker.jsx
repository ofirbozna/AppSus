const { useState, useRef, useEffect } = React

export function ColorPicker({
  note,
  onChangeColor,
  selectedColor,
  onColorSelect,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const colorMenuRef = useRef(null)

  const isNoteMode = note !== undefined

  const colors = [
    '#ffffff', // Default/white
    '#ffcc80', // Light orange
    '#80deea', // Light blue
    '#ff8a80', // Light red
    '#a0c78c', // Light green
    '#e6b800', // Yellow
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  function handleColorSelect(color, event) {
    event.preventDefault()
    event.stopPropagation()

    if (isNoteMode) {
      onChangeColor(note.id, color)
    } else {
      onColorSelect(color)
    }

    setIsOpen(false)
  }

  return (
    <div
      className="color-action"
      ref={colorMenuRef}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <button
        type="button"
        title="Change color"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <i className="fas fa-palette"></i>
      </button>

      {isOpen && (
        <div
          className="color-dropdown"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {colors.map((color) => (
            <button
              type="button"
              key={color}
              className={`color-option ${
                isNoteMode
                  ? note.style && note.style.backgroundColor === color
                    ? 'selected'
                    : ''
                  : selectedColor === color
                  ? 'selected'
                  : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={(e) => handleColorSelect(color, e)}
              title={`Set to ${color === '#ffffff' ? 'default' : color}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
