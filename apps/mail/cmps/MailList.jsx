import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { useEffect } = React
export function MailList({ mails,onRemove }) {

    return (
        <section className='mails-list'>
            <h1>Mails List</h1>
            <ul>
                {mails && mails.map(mail =>
                    <li className='mail-line' key={mail.id}>
                        <MailPreview mail={mail}/>
                        <button className='fa-solid fa-trash' onClick={()=>onRemove(mail.id)}></button>
                    </li>
                )}
            </ul>

        </section>
    )
}
