import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemove, filterBy, onSetIsCompose, onSetIsStared, onSetIsReadBtn }) {
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
                    <li className={'mail-line' + (mail.isRead ? ' read' : '')} key={mail.id}>
                        <button className={'star ' + (mail.isStared ? 'fa-solid fa-star stared' : 'fa-regular fa-star')} onClick={() => onSetIsStared(mail.id)}></button>
                        {mail.sentAt && <Link to={`/mail/${mail.id}`} onClick={() => onSetIsRead(mail.id)}>
                            <MailPreview mail={mail} filterBy={filterBy} />
                        </Link>}
                        {!mail.sentAt &&
                            <React.Fragment>
                                <MailPreview mail={mail} filterBy={filterBy} onSetIsCompose={onSetIsCompose} />
                            </React.Fragment>}
                        <div className="mail-date" >{new Date(mail.sentAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                        </div>
                        <section className='mail-btns'>
                            <button onClick={() => onSetIsReadBtn(mail.id)} className={mail.isRead ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open'}></button>
                            <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                        </section>
                    </li>
                )}
            </ul>

        </section>
    )
}
