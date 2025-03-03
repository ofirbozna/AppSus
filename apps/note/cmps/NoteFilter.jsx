const { useState, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

export function NoteFilter({ filterBy }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setSearchParams(filterByToEdit)
  }, [filterByToEdit])

  function onHandleChange(ev) {
    let { value, name: field } = ev.target
    setFilterByToEdit((prev) => ({ ...prev, [field]: value }))
  }

  function navigateToFilterPage() {
    const params = new URLSearchParams()
    Object.entries(filterByToEdit).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    navigate(`/filter?${params.toString()}`)
  }

  return (
    <section className="filter-container">
      <div className="search-bar" onClick={navigateToFilterPage}>
        <input
          className="search-bar-input"
          name="title"
          value={filterByToEdit.title}
          onChange={onHandleChange}
          type="text"
          placeholder="Search notes..."
          readOnly
        />
      </div>
    </section>
  )
}
