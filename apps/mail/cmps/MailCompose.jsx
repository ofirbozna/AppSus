import { mailsService } from "../services/mail.service.js"


const { useState, useEffect } = React
export function MailCompose({ onSetIsCompose }) {

    const [mailToCompose, setMailToCompose] = useState(mailsService.getEmptyMail())
 

    function onHandleChange({ target }) {
        let { value, name } = target
        setMailToCompose(prevMail => ({ ...prevMail, [name]: value }))
    }


    function onSubmitMail(ev) {
        ev.preventDefault()
        mailsService.save(mailToCompose)
        .then(onSetIsCompose)
        
    }

    const { body, subject, to } = mailToCompose
    return (
        <section className="mail-compose">
            <h1>New Message<button onClick={onSetIsCompose} className="fa-solid fa-x "></button></h1>
            <form onSubmit={onSubmitMail}>
                <label htmlFor="to">To</label>
                <input className="mail-address" onChange={onHandleChange} value={to} type="email" name='to' />

                <input onChange={onHandleChange} value={subject} type="text" placeholder="Subject" name='subject' />

                <textarea name="body" onChange={onHandleChange} value={body} id="body"></textarea>
                <button>Send</button>
            </form>
        </section>
    )
}