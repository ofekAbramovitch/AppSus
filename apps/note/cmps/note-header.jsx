const { Link, NavLink } = ReactRouterDOM
const { useState } = React

import { NoteFilter } from "./note-filter.jsx"

export function NoteHeader({ onSetFilter, screenWidth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    return <header className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <div className="logo">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
                </div>
            </Link>
            <NoteFilter onSetFilter={onSetFilter} />
            {screenWidth <= 768 && <i onClick={toggleMenu} className="fa-solid fa-bars"></i>}
            {(screenWidth > 768 || isMenuOpen) && <nav style={{ transform: "translateX(0)" }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>}
        </div>
    </header>
}
