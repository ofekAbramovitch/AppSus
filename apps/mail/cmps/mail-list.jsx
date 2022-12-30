import { MailPreview } from './mail-preview.jsx'


export function MailList({mails, loadMails}) {

    if(!mails.length) return <div>dont have mail</div>
    return <ul className="mail-list clean-list">
    {
        mails.map(mail => <li key={mail.id}>
            <MailPreview mail={mail} loadMails={loadMails}/>
        </li>)
    }
    </ul>

}
