const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFolderList} from "../cmps/mail-folder-list.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isSendEmail, setIsSendEmail] = useState(false)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        console.log('mailService.query():', mailService.query)
        mailService.query().then(setMails)
    }

    function sendMail() {
        setIsSendEmail(false)
    }

    if(!mails.length) return <div>loading...</div>
    return <section className="mail-app">
        <MailHeader />
        <div className="mail-content layout">
            <div>
                {isSendEmail && <MailList mails={mails}/>}
                {isSendEmail && <MailCompose />}
            </div>
            <div className="folder-list-container">
                <button onClick={() => {setIsSendEmail(true)}}><i class="fa-solid fa-plus"></i> Compose</button>
                <MailFolderList />
            </div>
        </div>
        
    </section>




}

