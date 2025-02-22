import { MailList } from "../cmps/MailList.jsx"
import { mailsService } from "../services/mail.service.js"


const { useState, useEffect } = React

export function MailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailsService.query()
            .then(mails=> {
                console.log(mails)
                setMails(mails)
            }
            )
    }

    return <section className="mails-container">
        <MailList mails={mails} />
    </section>
}

