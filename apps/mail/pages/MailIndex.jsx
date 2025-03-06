import { MailList } from "../cmps/MailList.jsx"
import { mailsService } from "../services/mail.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailSort } from "../cmps/MailSort.jsx"

const { useState, useEffect } = React
const { useSearchParams, Outlet } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailsService.getFilterFromSearchParams(searchParams))
    const [isCompose, setIsCompose] = useState(false)
    const [mailsCount, setMailsCount] = useState(0)
    const [draftToEdit, setDraftToEdit] = useState(mailsService.getEmptyMail())

    useEffect(() => {
        let subject = searchParams.get('subject')
        let body = searchParams.get('body')
        if (!subject || !body) return
        subject = decodeURIComponent(subject)
        body = decodeURIComponent(body)
        onSetIsCompose({
            createdAt: Date.now(),
            subject,
            body,
            isRead: true,
            isStarred: false,
            sentAt: null,
            removedAt: null,
            from: 'ofirNevo@appsus.com',
            to: ''
        })
    }, [])


    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
        countUnreadMails()
    }, [filterBy, isCompose])

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

    function onSetIsCompose(mail) {
        if (mail.sentAt) return
        setDraftToEdit(mail)
        setIsCompose(prevIsCompose => !prevIsCompose)
        // loadMails()
    }

    function onCloseMailEdit() {
        setIsCompose(prevIsCompose => !prevIsCompose)
    }


    function onSetIsStared(mailId) {
        setMails(prevMails => {
            return prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isStared: !mail.isStared } : mail
            )
        })
        mailsService.get(mailId)
            .then(mail => {
                mail.isStared = !mail.isStared
                mailsService.save(mail)

            })
    }


    function countUnreadMails() {
        mailsService.query()
            .then(mails => {
                const countMails = mails.filter(mail => mail.isRead === false).length
                setMailsCount(countMails)
            })
    }

    function onSetIsRead(mailId,isMailprevClicked) {
       console.log('work?')
        if(isMailprevClicked){
            setMails(prevMails => {
                return prevMails.map(mail =>
                    mail.id === mailId ? { ...mail, isRead: mail.isRead===true } : mail
                )
            })
        }else{
        setMails(prevMails => {
            return prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
            )
        })}
        mailsService.get(mailId)
            .then(mail => {
                mail.isRead = !mail.isRead
                mailsService.save(mail)
                .then(loadMails)

            })
    }

    return <section className="mails-container">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <MailSort onSortBy={onSortBy} />

        <main>
            <Outlet context={{
                mails,
                onRemove: removeMail,
                filterBy,
                onSetIsCompose,
                isCompose,
                onSetIsStared,
                onSetIsRead
            }} />
        </main>

        <section className="side-bar flex column">
            <button className='compose-btn' onClick={() => onSetIsCompose(draftToEdit)}><i className="fa-solid fa-pencil"></i> <span>Compose</span></button>
            <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} mailsCount={mailsCount} />
        </section>
        {isCompose && <MailCompose onCloseMailEdit={onCloseMailEdit} onSetIsCompose={onSetIsCompose} draftToEdit={draftToEdit} />}
    </section>
}

