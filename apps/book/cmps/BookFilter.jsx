const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setfilterByToEdit] = useState({ ...filterBy })
  // console.log(filterByToEdit)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function onHandleChange(ev) {
    let { value, type, name: field } = ev.target
    // console.log(field)

    if (type === 'number') value = +value
    setfilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function onSubmitForm(ev) {
    ev.preventDefault()

    onSetFilterBy(filterByToEdit)
  }

  return (
    <section className="filter-container">
      <h2>Filter by</h2>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="txt">Title</label>
        <input
          className="book-input"
          name="title"
          value={filterByToEdit.title}
          onChange={onHandleChange}
          type="text"
          id="txt"
        />
        <label htmlFor="minPrice">Price</label>
        <input
          name="minPrice"
          value={filterByToEdit.minPrice || ''}
          onChange={onHandleChange}
          type="number"
          id="minPrice"
        />
        <button className="book-btn">Submit</button>
      </form>
    </section>
  )
}
