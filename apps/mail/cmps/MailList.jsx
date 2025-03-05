import { mailsService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { useEffect } = React
const { Link, useOutletContext, useSearchParams, useNavigate } = ReactRouterDOM

export function MailList() {

    const { mails, onRemove, filterBy, onSetIsCompose, onSetIsStared, onSetIsReadBtn } = useOutletContext()
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    useEffect(() => {
        if(!searchParams)return
        navigate(`/note?${searchParams}`, { replace: true })
    }, [searchParams])

    function sentToNote(ev, mail) {
        ev.stopPropagation()
        setSearchParams({
            subject: mail.subject,
            body: mail.body
        })
    };
   
    

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
                        <li key={mail.id} className={'mail-line' + (mail.isRead ? ' read' : '')}>
                            <button className={'star ' + (mail.isStared ? 'fa-solid fa-star stared' : 'fa-regular fa-star')} onClick={() => onSetIsStared(mail.id)}></button>
                            <Link to={`/mail/${mail.id}`} onClick={(ev) => {
                        onSetIsRead(mail.id)
                        onSetIsCompose(mail)
                    }} ><MailPreview mail={mail} filterBy={filterBy} onSetIsCompose={onSetIsCompose} /></Link>
                            <div className="mail-date" >{new Date(mail.sentAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                            </div>
                            <section className='mail-btns'>
                                <button onClick={() => onSetIsReadBtn(mail.id)} className={mail.isRead ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open'}></button>
                                <button className='fa-solid fa-trash' onClick={() => onRemove(mail.id)}></button>
                                <button className="fa-regular fa-note-sticky" onClick={(ev) => sentToNote(ev,mail)}></button>
                            </section>
                        </li> 
                )}
            </ul>

        </section>
    )
}
