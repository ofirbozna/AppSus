import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM
const { useEffect } = React
export function MailList({ mails, onRemove,filterBy }) {

    function onSetIsRead(mailId) {
        mailsService.get(mailId)
            .then(mail => {
                mail.isRead = true
                mailsService.save(mail)
            })

    }



    return (
        <section className='mails-list'>
            <ul className="clean-list">
                {mails && mails.map(mail =>
                    <li className={'mail-line' + (mail.isRead  ? ' read' :'') } key={mail.id}>
                        <Link to={`/mail/${mail.id}`} onClick={() => onSetIsRead(mail.id)}>
                            <MailPreview mail={mail} filterBy={filterBy}/>
                        </Link>
                        <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                    </li>
                )}
            </ul>

        </section>
    )
}
