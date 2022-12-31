const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function MailDetails() {
    let [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(params.mailId) loadMail()
    },[])

    function loadMail() {
        mailService.get(params.mailId).then(setMail)
    }

    function sendNote() {
        navigate(`/note/${mail.subject}/${mail.body}`)
    }

    if(!mail) return <div>loading...</div> 
    return <section className="mail-details">
        <div className="buttons">
        <i onClick={sendNote} className="fa-sharp fa-solid fa-paper-plane"></i>
        <i onClick={() => navigate(-1)} className="fas fa-share"></i>
        </div>
        
        <div className="details-content">
            <h2>{mail.subject}</h2>
            <div>{mail.name} {`  < ${mail.from} >`}</div>
            <div>{mail.body}</div>
        </div>
        
    </section>
}