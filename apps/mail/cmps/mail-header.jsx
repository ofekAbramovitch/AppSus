const { Link, NavLink } = ReactRouterDOM

import { MailFilter } from "./mail-filter.jsx"

export function MailHeader() {
    return <header className="app-header">
        <div className="header-content layout">
           <Link to="/">
                <div className="logo">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
                </div>
            </Link>
            <MailFilter />
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </div>
    </header>
}