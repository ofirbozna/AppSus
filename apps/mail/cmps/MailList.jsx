import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemove, filterBy, onSetIsCompose,onSetIsStared }) {

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
                        <button className={'star ' + (mail.isStared ? 'fa-solid fa-star stared':'fa-regular fa-star' )} onClick={()=>onSetIsStared(mail.id)}></button>
                        {mail.sentAt && <Link to={`/mail/${mail.id}`} onClick={() => onSetIsRead(mail.id)}>
                                <MailPreview mail={mail} filterBy={filterBy} />
                            </Link>}
                            {!mail.sentAt &&
                            <React.Fragment>
                                <MailPreview mail={mail} filterBy={filterBy} onSetIsCompose={onSetIsCompose} />
                            </React.Fragment>}
                        <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                    </li>
                )}
            </ul>

        </section>
    )
}
