import { MailCompose } from "./MailCompose.jsx"


export function MailPreview({ mail,filterBy,onSetIsCompose }) {

    return (
        <section className='mail-preview' onClick={()=>onSetIsCompose(mail)}>
            <h3>{filterBy.folder=== 'sent'? mail.to:mail.from}</h3>
            <h4>{`${mail.subject}-`}</h4>
            <p>{mail.body}</p>
        </section>
    )
}