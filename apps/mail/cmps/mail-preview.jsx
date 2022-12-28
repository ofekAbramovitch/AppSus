import { LongTxt } from "../../../cmps/long-txt"

export function MailPreview({mail}) {
    return <article className="mail-preview">
        <div>{mail.name}</div>
        <div>
            <h3>{mail.subject}</h3>
            <div>- {mail.body}</div>
        </div>
    </article>
}