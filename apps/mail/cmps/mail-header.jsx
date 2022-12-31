const { Link, NavLink } = ReactRouterDOM
const { useState } = React

import { MailFilter } from "./mail-filter.jsx"

export function MailHeader({ onSetFilter, screenWidth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }
    return <header className="app-header mail-header">
        <div className="header-content layout">
           <Link to="/">
                <div className="logo">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
                </div>
            </Link>
            <MailFilter onSetFilter={ onSetFilter }/>
            {screenWidth <= 768 && <i onClick={toggleMenu} className="fa-solid fa-bars"></i>}
            {(screenWidth > 768 || isMenuOpen) && <nav style={{transform: "translateX(0)"}}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>}
        </div>
    </header>
}