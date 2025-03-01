

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
            <li className={filterBy.folder === 'inbox'? 'selected':''} onClick={() => onChooseFolder('inbox')}><i className="fa-solid fa-inbox"></i> Inbox <span>{mailsCount}</span></li>
            <li className={filterBy.folder === 'starred'? 'selected':''} onClick={() => onChooseFolder('starred')}><i className="fa-regular fa-star"></i> Starred</li>
            <li className={filterBy.folder === 'sent'? 'selected':''} onClick={() => onChooseFolder('sent')}><i className="fa-solid fa-paper-plane"></i> Sent</li>
            <li className={filterBy.folder === 'drafts'? 'selected':''} onClick={() => onChooseFolder('drafts')}><i className="fa-regular fa-file"></i> Drafts</li>
            <li className={filterBy.folder === 'trash'? 'selected':''} onClick={() => onChooseFolder('trash')}><i className="fa-solid fa-trash-can"></i> Trash</li>
        </ul>
    )
}