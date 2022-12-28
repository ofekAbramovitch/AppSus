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
        <h1>hello mail</h1>
        {/* <MailHeader /> */}
        <MailList mails={mails}/>
        {/* <MailFolderList /> */}
    </section>




}

