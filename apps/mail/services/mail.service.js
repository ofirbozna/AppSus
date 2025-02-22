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
}

function query() {
    return storageService.query(MAILS_KEY)
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
            sentAt: null,
            removedAt: null,
            from: utilService.getRandonEmail(),
            to: 'ofirNevo@appsus.com'
        }
        mails.push(mail)
    }
    utilService.saveToStorage(MAILS_KEY, mails)
}