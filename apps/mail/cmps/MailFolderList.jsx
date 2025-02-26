

const { useState,useEffect } = React

export function MailFolderList({ filterBy, onSetFilterBy }) {

    const [filteByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    console.log(filteByToEdit)

    useEffect(() => {
        onSetFilterBy(filteByToEdit)
    }, [filteByToEdit])


    function onChooseFolder(folder) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: folder }))
    }
    return (
        <ul className='folder-list clean-list flex column'>
            <li onClick={() => onChooseFolder('inbox')}><i className="fa-solid fa-inbox"></i> Inbox</li>
            <li onClick={() => onChooseFolder('starred')}><i className="fa-regular fa-star"></i> Starred</li>
            <li onClick={() => onChooseFolder('sent')}><i className="fa-solid fa-paper-plane"></i> Sent</li>
            <li onClick={() => onChooseFolder('drafts')}><i className="fa-regular fa-file"></i> Drafts</li>
            <li onClick={() => onChooseFolder('trash')}><i className="fa-solid fa-trash-can"></i> Trash</li>
        </ul>
    )
}