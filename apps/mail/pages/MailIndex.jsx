import { MailList } from "../cmps/MailList.jsx"
import { mailsService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailSort } from "../cmps/MailSort.jsx"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailsService.getFilterFromSearchParams(searchParams))
    const [isCompose, setIsCompose] = useState(false)
    const [mailsCount, setMailsCount] =useState(0)


    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
        countUnreadMails()
    }, [filterBy])

    function loadMails() {
        mailsService.query(filterBy)
            .then(mails => {
                console.log(mails)
                setMails(mails)
            }
            )
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSortBy({ target }) {
        let { value = 'date' } = target
        setMails(prevMails => (prevMails.toSorted((mail1, mail2) => {
            if (isNaN(mail1[value]) && isNaN(mail2[value])) return mail1[value].localeCompare(mail2[value])
            return (mail1[value]) - (mail2[value])
        })))
    }

    function removeMail(mailId) {
        mailsService.get(mailId)
            .then(mail => {
                if (mail.removedAt === null) {
                    mail.removedAt = Date.now()
                    mailsService.save(mail)
                        .then(savedMail =>
                            setMails(prevMails =>
                                prevMails.filter(currmail => currmail.id !== savedMail.id))
                        )
                } else {
                    mailsService.remove(mailId)
                        .then(() => {
                            setMails(prevMails => prevMails.filter(mail => mailId !== mail.id))
                        })
                }
            })

    }

    function onSetIsCompose() {
        setIsCompose(!isCompose)
        loadMails()
    }

    function countUnreadMails() {
        mailsService.query()
            .then(mails => {
                const countMails = mails.filter(mail => mail.isRead === false).length
                setMailsCount(countMails)
            })
    }

    return <section className="mails-container">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <MailSort onSortBy={onSortBy} />
        <button className='compose-btn' onClick={onSetIsCompose}><i className="fa-solid fa-pencil"></i>Compose</button>
        <MailList mails={mails} onRemove={removeMail} filterBy={filterBy} />
        <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} mailsCount={mailsCount} />
        {isCompose && <MailCompose onSetIsCompose={onSetIsCompose} />}
    </section>
}

