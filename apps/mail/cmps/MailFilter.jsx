


const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isSideBarOpen,setIsSideBarOpen] = useState(false)

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

    function onToggleSideBar(ev){
        ev.preventDefault()
        console.log('tired')
        setIsSideBarOpen(prevState => !prevState)
    }

    return (
        <React.Fragment>
            <section className={'mail-filter '  +( isSideBarOpen ? 'open': '')}>
                <form onSubmit={onSubmitForm}>
                    <input onChange={onHandelChange} type="text" value={filterByToEdit.txt} name="txt" placeholder="Search mail"/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <i className="fa-solid fa-bars" onClick={onToggleSideBar}></i>
                </form>
            </section>
            <select className='filter-by-read' onChange={onHandelChange} name="isRead" value={filterByToEdit.isRead} id="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
            <div className="screen" onClick={onToggleSideBar}></div>
        </React.Fragment>
    )


}