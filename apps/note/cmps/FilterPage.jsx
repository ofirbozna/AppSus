const { useState, useEffect } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

export function FilterPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [filterBy, setFilterBy] = useState({
    title: searchParams.get('title') || '',
    type: searchParams.get('type') || '',
    color: searchParams.get('color') || '',
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
    const newSearchParams = new URLSearchParams()
    Object.entries(filterBy).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value)
    })

    setSearchParams(newSearchParams)
    navigate(`/note?${newSearchParams.toString()}`)
  }

  function clearFilters() {
    setFilterBy({ title: '', type: '', color: '' })
    setSearchParams('')
  }

  const colors = [
    '#ffffff',
    '#ffcc80',
    '#80deea',
    '#ff8a80',
    '#a0c78c',
    '#e6b800',
  ]

  return (
    <section className="filter-page">
      <div className="filter-header">
        <button
          onClick={() => navigate('/note')}
          className="note-filter-back-btn"
        >
          Back
        </button>
        <h2>Filter Notes</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          name="title"
          value={filterBy.title}
          onChange={handleChange}
          placeholder="Search notes..."
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <h3>Types</h3>
        <div className="filter-types">
          <div
            className={`filter-type ${
              filterBy.type === 'note-txt' ? 'selected' : ''
            }`}
            onClick={() => onSelectType('note-txt')}
          >
            <div className="icon">✏️</div>
            <div className="label">Draw</div>
          </div>
          <div
            className={`filter-type ${
              filterBy.type === 'note-img' ? 'selected' : ''
            }`}
            onClick={() => onSelectType('note-img')}
          >
            <div className="icon">🖼️</div>
            <div className="label">Photo</div>
          </div>
          <div
            className={`filter-type ${
              filterBy.type === 'note-todos' ? 'selected' : ''
            }`}
            onClick={() => onSelectType('note-todos')}
          >
            <div className="icon">📋</div>
            <div className="label">List</div>
          </div>
          <div
            className={`filter-type ${
              filterBy.type === 'note-video' ? 'selected' : ''
            }`}
            onClick={() => onSelectType('note-video')}
          >
            <div className="icon">📹</div>
            <div className="label">Video</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Colors</h3>
        <div className="color-options">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className={`color-option ${
                filterBy.color === color ? 'selected' : ''
              }`}
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
