import { storageService } from '../../../services/async-storage.service.js' 
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query
}

const MAILS_KEY = 'mails'
const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    return storageService.query(MAILS_KEY).then(mails => {
        if(mails.length === 0) mails = _createMails()
        console.log('mails:', mails)
        return mails
    })
}

function _createMails() {
    const mails = [
        {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e104',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
        },     
    ]

    utilService.saveToStorage(MAILS_KEY, mails)
    return mails
}
   