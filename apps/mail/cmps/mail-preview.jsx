const { useNavigate} = ReactRouterDOM

import { LongTxt } from "../../../cmps/long-txt.jsx"

export function MailPreview({mail}) {
    const navigate = useNavigate()
    function getDate(date) {
        return new Date(date).toISOString().slice(0, 10)
    }
    return <article className="mail-preview">
        <div className="start-name-container">
            <div>{mail.isStared ? <i className="fas fa-solid fa-star checked"></i> : <i className="far fa-star"></i>}</div>
            <div>{mail.name}</div>
        </div>
        <div className="mail-preview-content" onClick={() => navigate(`/mail/${mail.id}`)}>
            <h3><LongTxt txt={mail.subject} length={10} isUseButton={false} /></h3>
            <div>-</div>
            <div><LongTxt txt={mail.body} length={20} isUseButton={false} /></div>
        </div>
        <div className="date">{getDate(mail.sentAt)}</div>
    </article>
}