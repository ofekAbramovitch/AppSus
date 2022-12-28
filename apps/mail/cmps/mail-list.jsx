import { MailPreview } from './mail-preview.jsx'


export function MailList({mails}) {

    if(!mails.length) return <div>loading...</div>
    return <ul className="mail-list clean-list">
    {
        mails.map(mail => <li key={mail.id}>
            <MailPreview mail={mail} />
        </li>)
    }
    </ul>

}
