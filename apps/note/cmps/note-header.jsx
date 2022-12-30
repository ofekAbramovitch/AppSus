const { Link, NavLink } = ReactRouterDOM

import { NoteFilter } from "./note-filter.jsx"

export function NoteHeader({ onSetFilter }) {
    return <header className="app-header">
        <div className="header-content layout">
           <Link to="/">
                <div className="logo">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
                </div>
            </Link>
            <NoteFilter onSetFilter={ onSetFilter }/>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </div>
    </header>
}