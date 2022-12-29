import { LongTxt } from "../../../cmps/long-txt.jsx"

export function MailPreview({mail}) {
    function getDate(date) {
        return new Date(date).toISOString().slice(0, 10)
    }
    return <article className="mail-preview">
        <div>{mail.name}</div>
        <div>
            <h3><LongTxt txt={mail.subject} length={20} isUseButton={false} /></h3>
            <div>-</div>
            <div><LongTxt txt={mail.body} length={40} isUseButton={false} /></div>
        </div>
        <div className="date">{getDate(mail.sentAt)}</div>
    </article>
}