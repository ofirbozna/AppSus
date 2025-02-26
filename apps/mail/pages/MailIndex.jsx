import { MailList } from "../cmps/MailList.jsx"
import { mailsService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    const [isCompose, setIsCompose] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailsService.query(filterBy)
            .then(mails => {
                console.log(mails)
                setMails(mails)
            }
            )
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function removeMail(mailId) {
        mailsService.get(mailId)
            .then(mail => {
                if (mail.removedAt === null) {
                    mail.removedAt = Date.now()
                    mailsService.save(mail)
                        .then(savedMail =>
                            setMails(prevMails =>
                                prevMails.filter(currmail => currmail.id !== savedMail.id))
                        )
                } else {
                    mailsService.remove(mailId)
                        .then(() => {
                            setMails(prevMails => prevMails.filter(mail => mailId !== mail.id))
                        })
                }
            })

    }

    function onSetIsCompose() {
        setIsCompose(!isCompose)
    }


    return <section className="mails-container">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <button className='compose-btn' onClick={onSetIsCompose}><i className="fa-solid fa-pencil"></i>Compose</button>
        <MailList mails={mails} onRemove={removeMail} />
        <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        {isCompose && <MailCompose onSetIsCompose={onSetIsCompose} />}
    </section>
}

