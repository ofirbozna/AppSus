const { useState, useEffect } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function FilterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [filterBy, setFilterBy] = useState({
    title: queryParams.get('title') || '',
    type: queryParams.get('type') || '',
    color: queryParams.get('color') || '',
  })

  function handleChange(ev) {
    const { name, value } = ev.target
    setFilterBy((prev) => ({ ...prev, [name]: value }))
  }

  function onSelectType(type) {
    setFilterBy((prev) => ({ ...prev, type }))
  }

  function onSelectColor(color) {
    setFilterBy((prev) => ({ ...prev, color }))
  }

  function applyFilters() {
    const params = new URLSearchParams()
    Object.entries(filterBy).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    navigate(`/note?${params.toString()}`)
  }

  function clearFilters() {
    setFilterBy({ title: '', type: '', color: '' })
  }

  const colors = [
    '#ffffff', // Default/white
    '#ffcc80', // Light orange
    '#80deea', // Light blue
    '#ff8a80', // Light red
    '#a0c78c', // Light green
    '#e6b800', // Yellow
  ]

  return (
    <section className="filter-page">
      <div className="filter-header">
        <button onClick={() => navigate('/note')} className="back-btn">
          Back
        </button>
        <h2>Filter Notes</h2>
      </div>

      <div className="search-container">
        <input type="text" name="title" value={filterBy.title} onChange={handleChange} placeholder="Search notes..." className="search-input" />
      </div>

      <div className="filter-section">
        <h3>Types</h3>
        <div className="filter-types">
          <div className={`filter-type ${filterBy.type === 'note-txt' ? 'selected' : ''}`} onClick={() => onSelectType('note-txt')}>
            <div className="icon">✏️</div>
            <div className="label">Draw</div>
          </div>
          <div className={`filter-type ${filterBy.type === 'note-img' ? 'selected' : ''}`} onClick={() => onSelectType('note-img')}>
            <div className="icon">🖼️</div>
            <div className="label">Photo</div>
          </div>
          <div className={`filter-type ${filterBy.type === 'note-todos' ? 'selected' : ''}`} onClick={() => onSelectType('note-todos')}>
            <div className="icon">📋</div>
            <div className="label">List</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Colors</h3>
        <div className="color-options">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className={`color-option ${filterBy.color === color ? 'selected' : ''}`}
              style={{
                backgroundColor: color,
                border: color === '#ffffff' ? '1px solid #ccc' : 'none',
              }}
              onClick={() => onSelectColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={clearFilters} className="clear-btn">
          Clear Filters
        </button>
        <button onClick={applyFilters} className="apply-btn">
          Apply
        </button>
      </div>
    </section>
  )
}
