const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFolderList} from "../cmps/mail-folder-list.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [isSendEmail, setIsSendEmail] = useState(false)
    const [filter, setFilter] = useState(mailService.createFilter())
    const [screenWidth, setScreenWidth] = useState(screen.width)
    const params = useParams()

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    }, [])

    useEffect(() => {
        loadMails()
    }, [filter])

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    function loadMails() {
        mailService.query(filter).then(setMails)
    }

    function onSaveMail(mail) {
        mail.sentAt = Date.now()
        mail.status = 'sent-mail'
        mails.push(mail)
        mailService.save(mail).then(() =>{
            setMails(mails)
            setIsSendEmail(false)
    })
    }

    function onMoveToTrash(mail) {
        mail.status = 'trash'
        mail.sentAt = Date.now()
        mails.push(mail)
        mailService.save(mail).then(() =>{
            setMails(mails)
            setIsSendEmail(false)
    })
    }

    function onSetFilterTxt(filter) {
        setFilter((prevFilter) => ({ ...prevFilter, txt: filter.txt, isRead: filter.isRead  }))
    }

    function onSetFilterStatus(status) {
        if(status === 'starred')  setFilter((prevFilter) => ({ ...prevFilter, status: null, isStared: true }))
        else setFilter((prevFilter) => ({ ...prevFilter, status, isStared: null }))
    }


    if(!mails) return <div>loading...</div>
    return <section className="mail-app">
        <MailHeader onSetFilter={ onSetFilterTxt }/>
        <div className="mail-content layout">
            {/* <div className="folder-list-container">
                    <button onClick={() => {setIsSendEmail(true)}}><i class="fa-solid fa-plus"></i> Compose</button>
                    <MailFolderList setStatus={() => onSetFilterStatus((window.location.href).split('/').pop())}/>
            </div> */}
            <div className="folder-list-container">
                    <button onClick={() => {setIsSendEmail(true)}}><i class="fa-solid fa-plus"></i>{screenWidth >= 650 && 'Compose'}</button>
                    <MailFolderList screenWidth={screenWidth} setStatus={() => onSetFilterStatus((window.location.href).split('/').pop())}/>
            </div>
            <div>
                    {!params.mailId && !isSendEmail && <MailList mails={mails} loadMails={loadMails}/>}
                    {!params.mailId && isSendEmail && <MailCompose  onSaveMail={onSaveMail} setIsSendEmail={setIsSendEmail} onMoveToTrash={onMoveToTrash}/>}
                    {params.mailId && <MailDetails />}
            </div>
        </div>
        
    </section>




}

