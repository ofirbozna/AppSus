


const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function onHandelChange({ target }) {
        let { name, value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    return (
        <React.Fragment>
            <section className='mail-filter'>
                <form onSubmit={onSubmitForm}>
                    <input onChange={onHandelChange} type="text" value={filterByToEdit.txt} name="txt" placeholder="Search mail"/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </form>
            </section>
            <select className='filter-by-read' onChange={onHandelChange} name="isRead" value={filterByToEdit.isRead} id="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </React.Fragment>
    )


}