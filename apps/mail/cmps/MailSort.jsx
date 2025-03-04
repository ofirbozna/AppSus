

export function MailSort({onSortBy}){
    return (
        <section className="mail-sort"> 
            <select onChange={onSortBy} name="" id="">
                <option value="sentAt">Date</option>
                <option value="subject">Subject</option>
            </select>
        </section>
    )
}