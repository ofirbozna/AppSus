const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const navigate = useNavigate()
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function onHandleChange(ev) {
    let { value, name: field } = ev.target
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onSubmitForm(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
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
      <h2>Search Notes</h2>
      <form onSubmit={onSubmitForm}>
        <div className="search-bar" onClick={navigateToFilterPage}>
          <input name="title" value={filterByToEdit.title} onChange={onHandleChange} type="text" placeholder="Search notes..." readOnly />
          <button type="button" className="filter-icon">
            🔍
          </button>
        </div>
      </form>
    </section>
  )
}
