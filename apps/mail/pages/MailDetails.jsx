import { mailsService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React
export function MailDetails() {
    const [mail, setMail] = useState(null)


    const params = useParams()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailsService.get(params.mailId)
            .then(setMail)
    }

    function getDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }


    if (!mail) return 'Loading...'
    return (
        <section className="mail-details">
            <Link to="/mail"><i className="fa-solid fa-arrow-left"></i></Link>
            <h3>{mail.subject}</h3>
            <div>
            <h4>{mail.from}</h4>
            <h5>{mail.sentAt? getDate(mail.sentAt):''}</h5>
            </div>
            <h5>{mail.to}</h5>
            <p>{mail.body}</p>
        </section>
    )
}