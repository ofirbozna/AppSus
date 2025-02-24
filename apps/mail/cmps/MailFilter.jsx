


const { useState, useEffect } = React
export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filteByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    console.log(filteByToEdit)

    useEffect(() => {
        onSetFilterBy(filteByToEdit)
    }, [filteByToEdit])

    function onSubmitForm() {
        console.log('filter')
    }

    function onHandelChange({ target }) {
        let { name, value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    return (
        <form onSubmit={onSubmitForm}>
            <input onChange={onHandelChange} type="text" value={filteByToEdit.txt} name="txt" />
            <select onChange={onHandelChange} name="isRead" value={filteByToEdit.isRead} id="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    )


}