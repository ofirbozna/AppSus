import { mailsService } from "../services/mail.service.js"


const { useState, useEffect, useRef } = React
export function MailCompose({ onSetIsCompose }) {

    const [mailToCompose, setMailToCompose] = useState(mailsService.getEmptyMail())
    const mailToComposeRef = useRef(mailToCompose);
    mailToComposeRef.current = mailToCompose;
    // console.log(mailToCompose)

    useEffect(() => {
        mailsService.save(mailToCompose)
            .then(setMailToCompose)
    }, [])

    useEffect(() => {
        if (mailToCompose.sentAt) {
            mailsService.save(mailToCompose)
                .then(onSetIsCompose)
        }
    }, [mailToCompose]);

    useEffect(() => {
           const intervalId= setInterval(() => {
               mailsService.save(mailToComposeRef.current)
           }, 5000); 

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    function onHandleChange({ target }) {
        let { value, name } = target
        setMailToCompose(prevMail => ({ ...prevMail, [name]: value }))
    }


    function onSubmitMail(ev) {
        ev.preventDefault()
        setMailToCompose(prevMail => ({ ...prevMail, sentAt: Date.now() }))
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