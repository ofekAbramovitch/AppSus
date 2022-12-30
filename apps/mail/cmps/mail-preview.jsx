const { useState, useEffect } = React

const { useNavigate} = ReactRouterDOM

import { LongTxt } from "../../../cmps/long-txt.jsx"
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({mail, loadMails}) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [screenWidth, setScreenWidth] = useState(screen.width)
    const navigate = useNavigate()

    useEffect(() => {
          window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))
      
          return () => {
            window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
          }
    }, [])

    function getDate(time) {
        const date = new Date(time)
        const month = utilService.getMonthName(date)
        const day = date.getDate()
        return `${day}  ${month}`
    }

    function onToggleStared() {
        mail.isStared = !mail.isStared
        mailService.save(mail).then(() => loadMails())
    }

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    function getStared() {
        return mail.isStared ? <i className="fas fa-solid fa-star checked"></i> : <i className="far fa-star"></i>
    }

    function onMoveToTrash() {
        mail.status = 'trash'
        mailService.save(mail).
        then(() => loadMails())
    }

    function onMoveToDetails() {
        mail.isRead = true
        mailService.save(mail).then(() => {
            console.log('mail:', mail)
            navigate(`/mail/${mail.id}`)
            loadMails()
        })
        
    }

    console.log('() => setScreenWidth(screen.width):', screen.width)

    return <article className={`mail-preview  + ${mail.isRead && ' read'}` } onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)}>
        <div className="stared-name-container" onClick={onToggleStared}>
            {isMouseOver && screenWidth <= 650 && <i onClick={() => onMoveToTrash()} className="fa-solid fa-trash"></i>}
            {!isMouseOver && screenWidth <= 650 && <div className="date-stared">
                <div className="date">{getDate(mail.sentAt)}</div>
                {getStared()}
            </div>}
            {screenWidth > 650 && getStared()}
            {screenWidth >= 850 && <div>{mail.name}</div>}
        </div>
        <div className="mail-preview-content" onClick={onMoveToDetails}>
            {screenWidth < 850 && <div>{mail.name}</div>}
            <h3 className="mail-subject"><LongTxt txt={mail.subject} length={5} isUseButton={false} /></h3>
            {screenWidth >= 850 && <div>-</div>}
            <div className="mail-body">{mail.body}</div>
        </div>
        {screenWidth > 650 && <div>
            {!isMouseOver && <div className="date">{getDate(mail.sentAt)}</div>}
            {isMouseOver && <i onClick={() => onMoveToTrash()} className="fa-solid fa-trash"></i>}
        </div> }
    </article>
}