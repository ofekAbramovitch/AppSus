const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFolderList} from "../cmps/mail-folder-list.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isSendEmail, setIsSendEmail] = useState(false)
    const [filter, setFilter] = useState(mailService.createFilter())

    useEffect(() => {
        loadMails()
    }, [filter])

    function loadMails() {
        mailService.query(filter).then(setMails)
    }

    function onSaveMail(mail) {
        mail.sentAt = Date.now()
        mails.push(mail)
        setMails(mails)
        mailService.save(mail).then(
            setIsSendEmail(false)
        )
    }

    function onSetFilterTxt(txt) {
        setFilter((prevFilter) => ({ ...prevFilter, txt }))
    }

    function onSetFilterStatus(status) {
        setFilter((prevFilter) => ({ ...prevFilter, status }))
    }


    if(!mails) return <div>loading...</div>
    return <section className="mail-app">
        <MailHeader onSetFilter={ onSetFilterTxt }/>
        <div className="mail-content layout">
            <div>
                {!isSendEmail && <MailList mails={mails}/>}
                {isSendEmail && <MailCompose  onSaveMail={onSaveMail}/>}
            </div>
            <div className="folder-list-container">
                <button onClick={() => {setIsSendEmail(true)}}><i class="fa-solid fa-plus"></i> Compose</button>
                <MailFolderList setStatus={() => onSetFilterStatus((window.location.href).split('/').pop())}/>
            </div>
        </div>
        
    </section>




}

