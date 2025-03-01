

export function MailPreview({ mail,filterBy }) {

    return (
        <section className='mail-preview'>
            <h3>{filterBy.folder=== 'sent'? mail.to:mail.from}</h3>
            <h4>{`${mail.subject}-`}</h4>
            <p>{mail.body}</p>
        </section>
    )
}