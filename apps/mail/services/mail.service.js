import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'mailDB'

const loggedinUser = {
    email: 'ofirNevo@appsus.com',
    fullname: 'Ofir Nevo'
}

_createMails()

export const mailsService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}

function query(filterBy={}) {
    return storageService.query(MAILS_KEY)
    .then(mails=>{
        console.log(filterBy.txt)
        if(filterBy.txt){
            console.log(filterBy.txt)
            const regExp = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail =>
                 regExp.test(mail.subject) ||
                 regExp.test(mail.body)||
                 regExp.test(mail.from)
                )
        }
        if (filterBy.isRead){
            if(filterBy.isRead==='read'){
            mails = mails.filter(mail=> mail.isRead === true)}
            if(filterBy.isRead==='unread'){
                mails = mails.filter(mail=> mail.isRead === false)}
        }
        return mails
    })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
    } else {
        return storageService.post(MAILS_KEY, mail)
    }
}

function getDefaultFilter(filterBy = { txt: '', isRead: '' }) {
    return {
        txt: filterBy.txt,
        isRead: filterBy.isRead
    }

}
function _createMails() {
    const mails = utilService.loadFromStorage(MAILS_KEY) || []

    if (mails && mails.length) return
    for (let i = 0; i < 15; i++) {
        const mail = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: utilService.makeLorem(3),
            body: utilService.makeLorem(utilService.getRandomIntInclusive(10, 50)),
            isRead: false,
            sentAt: Date.now(),
            removedAt: null,
            from: utilService.getRandonEmail(),
            to: 'ofirNevo@appsus.com'
        }
        mails.push(mail)
    }
    utilService.saveToStorage(MAILS_KEY, mails)
}