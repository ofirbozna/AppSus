
export function MailPreview({ mail }) {

    return (
        <section className='mail-preview'>
            <h3>{mail.from}</h3>
            <h4>{mail.subject}</h4>
            <p>{mail.body}</p>
        </section>
    )
}