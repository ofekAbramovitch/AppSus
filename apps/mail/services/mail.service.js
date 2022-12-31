import { storageService } from '../../../services/async-storage.service.js' 
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    get, 
    remove,
    save,
    createEmptyMail,
    createFilter
}

const MAILS_KEY = 'mails'
const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filter) {
    console.log('filter:', filter)
    return storageService.query(MAILS_KEY).then(mails => {
        if(mails.length === 0) mails = _createMails()
        mails = filterMail(filter, mails)
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

function filterMail(filter, mails) {
    console.log('filter', filter);
    if (filter.txt) {
        const regex = new RegExp(filter.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.name) || regex.test(mail.body))
    }
    if(filter.status) mails = mails.filter(mail => {
        console.log('filter.status:', filter.status)
        console.log('mail.status:', mail.status)
        return filter.status === mail.status})
    if(filter.isRead !== '')  {
        filter.isRead = filter.isRead === 'true' ? true : false
        mails = mails.filter(mail => filter.isRead === mail.isRead)
    }
    if(filter.isStared) mails = mails.filter(mail => filter.isStared === mail.isStared)
    return mails
}

function createFilter() {
    return  {
        status: 'inbox',
        txt: '', 
        isRead: '', 
        isStared: '', 
    }       
}

function createEmptyMail() {
    return {
        name: 'Mahatma Appsus',
        status: 'draft',
        subject: '',
        body: '',
        isRead: false,
        sentAt : Date.now(),
        from: gLoggedinUser.email,
        to: ''
        }
}

function _createMails() {
    const mails = [
        {
        id: 'e101',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: true,
        sentAt : 1551133930594,
        from: gLoggedinUser.email,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e102',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: true,
        sentAt : 1551133930594,
        from: gLoggedinUser.email,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e103',
        status: 'inbox',
        name: 'Gal',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: true,
        sentAt : 1551133930594,
        from: 'momo@momo.com',
        to: gLoggedinUser.email
        }, 
        {
        id: 'e104',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStared: false,
        sentAt : 1551133930594,
        from: gLoggedinUser.email,
        to: 'momo@momo.com'
        }, 
        {
        id: 'e105',
        status: 'inbox',
        name: 'DropBox',
        subject: 'Stav and 126 others made changes in your shared folders    ',
        body: 'Activity in Shared Folders Heres what happened in your shared folders last week',
        isRead: false,
        isStared: true,
        sentAt : 155113393054,
        from: 'reply@dropbox.com',
        to: gLoggedinUser.email
        }, 
        {
        id: 'e106',
        status: 'sent-mail',
        name: 'Wizz Air',
        subject: 'Important Information about your Wizz Air flight',
        body: 'We would like to inform you that due to operational reasons the check-in desks close sharply 60 minutes prior to the departure of your flight to/from Tel-Aviv. Please plan to arrive at the airport accordingly to allow sufficient time for the check-in or baggage drop-off. Proceed to security control immediately, you must be present at the boarding gate ready for boarding not later than 20 minutes before the scheduled departure time of the flight. Make sure to have your passport ready to present at the gate as well to ensure more efficient passport chec',
        isRead: false,
        isStared: false,
        sentAt : 15511339305,
        from: 'notifications@notifications.wizzair.com',
        to: gLoggedinUser.email
        }, 
        {
        id: 'e107',
        status: 'inbox',
        name: 'Tomorrowland',
        subject: 'Discover all you need',
        body: 'Hi there, It’s one thing for us to tell you about new features, but it’s so much more special when we can share how these updates have helped people unlock their inner designer and achieve their goals! Here are a few of our favourite tweets from the last few months as people explore what’s new:I have been playing with the Canva Video Editor today. You NEED to try it to see how awesome it really is. 💯 @Canva is truly becoming a one-stop shop for creativity!',
        isRead: false,
        isStared: false,
        sentAt : 1551133930594,
        from: 'start@tomorrowland.com',
        to: gLoggedinUser.email
        }, 
        {
        id: 'e108',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Can I be frank?',
        body: 'The clock is ticking... I havent heard from you yet, so I just wanted to make sure you’ve heard the news. If you have been on the fence about joining The Motley Fool...today is your day! Because were taking up to 78% Off the list price for new members1 of The Motley Fool today in our special Double Down Event! And even better, thanks to our ironclad guarantee...you can take a full 30 days to "kick the tires"...and still get your entire membership fee back if youre not completely satisfied. But please dont delay...because like I said earlier the clock is ticking. And I cant guarantee this offer will be open tomorrow.',
        isRead: false,
        isStared: true,
        sentAt : 1551133930594,
        from: gLoggedinUser.email,
        to: 'fool@foolsubs.com'
        }, 
        {
        id: 'e109',
        status: 'sent-mail',
        name: 'Real Rewards & Aerie',
        subject: 'Get $50 to start investing',
        body: 'Real Rewards by American Eagle & Aerie members earn points on purchases (after discounts and before taxes and fees) made at American Eagle Outfitters® and Aerie®. Click here for Real Rewards by American Eagle & Aerie terms and conditions. See Real Rewards by American Eagle & Aerie terms and conditions to end your membership in Real Rewards. If you end your membership, you will no longer receive your free benefits, points towards rewards and email updates.',
        isRead: false,
        isStared: true,
        sentAt : 15511339,
        from: gLoggedinUser.email,
        to: 'ae@e.ae.com'
        }, 
        {
        id: 'e110',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Re-use your best content',
        body: 'Re-use. Reformat .Really easily. Re-using the valuable information in your PDFs is as easy as saving a file with Acrobat Pro DC.Convert PDF files to editable Microsoft Word, Excel, PowerPoint files, even from your mobile phone or tablet. Spend less time reformatting complex documents – and stay productive wherever you are. Buy nowWould love to catch up sometimes Would love to catch up sometimesAdobe services, like Adobe Creative Cloud, are available only to users 13 and older. Use of Adobe services and applications requires agreement with the applicable Terms of Use and the Adobe Privacy Policy. Adobe, Adobe Acrobat and the Adobe logo are either registered trademarks or trademarks of Adobe in the United States and/or other countries. All other trademarks are the property of their respective owners.',
        isRead: false,
        isStared: false,
        sentAt : 155139305,
        from: gLoggedinUser.email,
        to: 'mail@mail.adobe.com'
        }, 
        {
        id: 'e111',
        status: 'sent-mail',
        name: 'Mahatma Appsus',
        subject: 'Your Next Scuba Escape...',
        body: 'With seasons and marine life in mind, we created an annual diving calendar which highlights the hotspots around the world in each month. Explore these destinations and book your next dream scuba vacation. \n For snow lovers and those with a thirst for adventure, why not embrace the cold and a dry suit and head for the spectacular land and seascapes of Antarctica!',
        isRead: false,
        isStared: true,
        sentAt : 15511330594,
        from: gLoggedinUser.email,
        to: 'travel@padi.com'
        }, 
        {
        id: 'e112',
        status: 'inbox',
        name: 'The Open University',
        subject: 'important message!',
        body: 'This is your day yaeli, make it legendary. Heres a special surprise from TML by Tomorrowland to celebrate your birthday and to cherish unforgettable memories.Adobe, the Adobe logo, and the Adobe XD logo are either registered trademarks or trademarks of Adobe Systems Incorporated in the United States and/or other countries. All other trademarks are the property of their respective owners. This is a marketing email from Adobe Systems Software Ireland Limited, 4‑6 Riverwalk, Citywest Business Park, Dublin 24, Ireland. Click here to unsubscribe or send an unsubscribe request to the postal address above. Please review the Adobe Privacy Policy. To ensure future delivery of email, add mail@email.adobe.com to your address book, contacts, or safe senders list. Registered office: Adobe Systems Software Ireland Limited, 4‑6 Riverwalk, Citywest Business Park, Dublin 24, Ireland. Registered number: 344992',
        isRead: false,
        isStared: true,
        sentAt : 1533930594,
        from: 'theOpen@openu.ac.il',
        to: gLoggedinUser.email
        }, 
    ]

    utilService.saveToStorage(MAILS_KEY, mails)
    return mails
}
   