import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link, useOutletContext } = ReactRouterDOM

export function MailList() {

    const { mails, onRemove, filterBy, onSetIsCompose, onSetIsStared, onSetIsReadBtn } = useOutletContext()
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
                    <Link to={`/mail/${mail.id}`} onClick={(ev) => {
                        onSetIsRead(mail.id)
                        onSetIsCompose(mail)
                    }} key={mail.id}>
                        <li className={'mail-line' + (mail.isRead ? ' read' : '')}>
                            <button className={'star ' + (mail.isStared ? 'fa-solid fa-star stared' : 'fa-regular fa-star')} onClick={() => onSetIsStared(mail.id)}></button>
                            <MailPreview mail={mail} filterBy={filterBy} onSetIsCompose={onSetIsCompose} />
                            <div className="mail-date" >{new Date(mail.sentAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                            </div>
                            <section className='mail-btns'>
                                <button onClick={() => onSetIsReadBtn(mail.id)} className={mail.isRead ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open'}></button>
                                <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                            </section>
                        </li> </Link>
                )}
            </ul>

        </section>
    )
}
