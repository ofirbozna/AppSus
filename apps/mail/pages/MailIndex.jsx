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

    function removeMail(mailId){
        mailsService.remove(mailId)
        .then(()=>{
            setMails(prevMails=> prevMails.filter(mail=> mailId !== mail.id))
        })
    }

    return <section className="mails-container">
        <MailList mails={mails} onRemove={removeMail} />
    </section>
}

