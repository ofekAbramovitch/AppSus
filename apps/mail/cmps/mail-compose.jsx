
const { useState } = React
import { mailService } from "../services/mail.service.js"

export function MailCompose({onSaveMail}) {
    const [ mail, setMail ] = useState(mailService.createEmptyMail())

    function handleChange({ target }) {
        let { value, name: field } = target
        setMail((prevMail) => ({ ...prevMail, [field]: value }))
    }

    return <section className="mail-compose">
        <div className="title-container"><h3>New massage</h3></div>
            <div>
                <input type="text"
                id="to"
                name="to"
                placeholder="To:"
                value={mail.to}
                onChange={handleChange}
                />
            </div>
            <div>
                <input type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={mail.subject}
                onChange={handleChange}
                />
            </div>
            <div>
                <textarea type="text"
                id="body"
                name="body"
                value={mail.body}
                onChange={handleChange}
                />
            </div>
            <div className="button-container flex space-between align-center">
                <button onClick={() => onSaveMail(mail)}>Send</button>
                <i className="fa-solid fa-trash"></i>
            </div>
    </section>
}