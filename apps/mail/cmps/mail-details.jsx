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

    if(!mail) return <div>loading...</div> 
    {console.log('mail:', mail)}
    return <section className="mail-details">
        <button onClick={() => navigate(-1)}>X</button>
        <div className="details-content">
            <h2>{mail.subject}</h2>
            <div>from: {mail.from}</div>
            <div>{mail.body}</div>
        </div>
        
    </section>
}