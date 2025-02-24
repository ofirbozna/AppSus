import { MailList } from "../cmps/MailList.jsx"
import { mailsService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())

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
        mailsService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mailId !== mail.id))
            })
    }


    return <section className="mails-container">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
        <MailList mails={mails} onRemove={removeMail}/>
    </section>
}

