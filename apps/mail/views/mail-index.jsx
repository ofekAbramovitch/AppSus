const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFolderList} from "../cmps/mail-folder-list.jsx"

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        console.log('mailService.query():', mailService.query)
        mailService.query().then(setMails)
    }

    if(!mails.length) return <div>loading...</div>
    return <section className="mail-app">
        <MailHeader />
        <div className="mail-content layout">
            <MailList mails={mails}/>
            <div className="folder-list-container">
                <button><i class="fa-solid fa-plus"></i> add mail</button>
                <MailFolderList />
            </div>
        </div>
        
    </section>




}

