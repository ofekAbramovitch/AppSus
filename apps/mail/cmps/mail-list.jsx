import { MailPreview } from "./mail-preview";


export function MailList({mails}) {

    if(!mails.length) return <div>loading...</div>
    return <ul className="mail-list">
    {
        mails.map(mail => <li key={mail.id}>
            <MailPreview book={book} />
        </li>)
    }
    </ul>

}
