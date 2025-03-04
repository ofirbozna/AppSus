

const { useState,useEffect } = React

export function MailFolderList({ filterBy, onSetFilterBy, mailsCount }) {

    const [filteByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filteByToEdit)
    }, [filteByToEdit])


    function onChooseFolder(folder) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: folder }))
    }
    return (
        <ul className='folder-list clean-list flex column'>
            <li className={filterBy.folder === 'inbox'? 'selected':''} onClick={() => onChooseFolder('inbox')}><i className="fa-solid fa-inbox"></i> <span>Inbox</span> <span>{mailsCount}</span></li>
            <li className={filterBy.folder === 'starred'? 'selected':''} onClick={() => onChooseFolder('starred')}><i className="fa-regular fa-star"></i> <span>Starred</span></li>
            <li className={filterBy.folder === 'sent'? 'selected':''} onClick={() => onChooseFolder('sent')}><i className="fa-solid fa-paper-plane"></i> <span>Sent</span></li>
            <li className={filterBy.folder === 'drafts'? 'selected':''} onClick={() => onChooseFolder('drafts')}><i className="fa-regular fa-file"></i> <span>Drafts</span></li>
            <li className={filterBy.folder === 'trash'? 'selected':''} onClick={() => onChooseFolder('trash')}><i className="fa-solid fa-trash-can"></i> <span>Trash</span></li>
        </ul>
    )
}