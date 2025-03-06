import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link, useOutletContext, useNavigate } = ReactRouterDOM

export function MailList() {

    const { mails, onRemove, filterBy, onSetIsCompose, onSetIsStared, onSetIsRead } = useOutletContext()

    const navigate = useNavigate()

    function sentToNote(ev, mail) {
        ev.stopPropagation()
        navigate(`/note?subject=${mail.subject}&body=${mail.body}`, { replace: true })
    }

    return (
        <section className='mails-list'>
            <ul className="clean-list">
                {mails && mails.map(mail =>
                    <li key={mail.id} className={'mail-line' + (mail.isRead ? ' read' : '')}>
                        <button className={'star ' + (mail.isStared ? 'fa-solid fa-star stared' : 'fa-regular fa-star')} onClick={() => onSetIsStared(mail.id)}></button>
                        <Link to={`/mail/${mail.id}`} onClick={(ev) => {
                            onSetIsRead(mail.id,true)
                            onSetIsCompose(mail)
                        }} ><MailPreview mail={mail} filterBy={filterBy} /></Link>
                        <div className="mail-date" >{new Date(mail.sentAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                        </div>
                        <section className='mail-btns'>
                            <button onClick={() => onSetIsRead(mail.id,false)} className={mail.isRead ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open'}></button>
                            <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                            <button className="fa-regular fa-note-sticky" onClick={(ev) => sentToNote(ev, mail)}></button>
                        </section>
                    </li>
                )}
            </ul>

        </section>
    )
}
