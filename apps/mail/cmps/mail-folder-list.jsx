const { NavLink } = ReactRouterDOM

export function MailFolderList() {
    return <section className="mail-folder-list">
       <nav>
            <NavLink to="/mail:inbox"><i class="fa-solid fa-inbox"></i> inBox</NavLink>
            <NavLink to="/mail:starred"><i class="fa-solid fa-star"></i> Stared</NavLink>
            <NavLink to="/mail:set-mail"><i class="fa-sharp fa-solid fa-paper-plane"></i> Sent-mail</NavLink>
            <NavLink to="/mail:draft"><i class="fa-solid fa-trash"></i> Draft</NavLink>
        </nav>
    </section>
}