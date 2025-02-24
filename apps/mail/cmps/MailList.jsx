import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM
const { useEffect } = React
export function MailList({ mails, onRemove }) {
    

    return (
        <section className='mails-list'>
            <ul>
                {mails && mails.map(mail =>
                    <li className='mail-line' key={mail.id}>
                        <Link to={`/mail/${mail.id}`} >
                            <MailPreview mail={mail} />
                        </Link>
                        <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                    </li>
                )}
            </ul>

        </section>
    )
}
