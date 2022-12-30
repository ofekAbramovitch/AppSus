const { NavLink } = ReactRouterDOM

export function MailFolderList({ setStatus ,screenWidth}) {

    return <section onClick={() => setStatus()} className="mail-folder-list">
       {screenWidth >= 650 && <nav>
            <NavLink to="/mail/inbox"><i className="fa-solid fa-inbox"></i> inBox</NavLink>
            <NavLink to="/mail/starred"><i className="fa-solid fa-star"></i> Stared</NavLink>
            <NavLink to="/mail/sent-mail"><i className="fa-sharp fa-solid fa-paper-plane"></i> Sent-mail</NavLink>
            <NavLink to="/mail/draft"><i className="fa-solid fa-trash"></i> Draft</NavLink>
        </nav>}
        {screenWidth < 650 && <nav>
            <NavLink to="/mail/inbox"><i className="fa-solid fa-inbox"></i></NavLink>
            <NavLink to="/mail/starred"><i className="fa-solid fa-star"></i></NavLink>
            <NavLink to="/mail/sent-mail"><i className="fa-sharp fa-solid fa-paper-plane"></i></NavLink>
            <NavLink to="/mail/draft"><i className="fa-solid fa-trash"></i></NavLink>
        </nav>}
    </section>
}