
const { useState, useEffect, useRef } = React
const {  useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose({onSaveMail, setIsSendEmail, onMoveToTrash, params}) {
    const [ mail, setMail ] = useState(mailService.createEmptyMail())
    const interval = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setIsSendEmail(true)
        if(params.noteTitle && params.noteBody) {
            mail.body = params.noteBody
            mail.subject = params.noteTitle
        }
        mailService.save(mail).then((mail) => {
            setMail(mail)
        })
    }, [])

    useEffect(() => {
        interval.current = setInterval(onMoveToDraft, 5000)
        
        return () => clearInterval(interval.current)
    })

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

     function onMoveToDraft() {
        mail.sentAt = Date.now()
        console.log('maildraft:', mail)
        mailService.save(mail);
    }

    function close() {
        setIsSendEmail(false)
        navigate('/mail/inbox')
    }
    
    return <section className="mail-compose">
        <div className="title-container">
            <h3>New massage</h3>
            <button className="delete" onClick={close}>x</button>
            </div>
                <input type="text"
                id="to"
                name="to"
                placeholder="To:"
                value={mail.to}
                onChange={handleChange}
                />
                <input type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={mail.subject}
                onChange={handleChange}
                />
                <textarea type="text"
                id="body"
                name="body"
                value={mail.body}
                onChange={handleChange}
                />
            <div className="button-container flex space-between align-center">
                <button onClick={() => onSaveMail(mail)}>Send</button>
                <i onClick={() => onMoveToTrash(mail)} className="fa-solid fa-trash"></i>
            </div>
    </section>
}