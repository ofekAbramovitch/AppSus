const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader({ screenWidth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    return <header className="app-header">
        <div className="header-content layout">
            <Link className="logo" to="/">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
            </Link>
            {screenWidth <= 481 && <i onClick={toggleMenu} className="fa-solid fa-bars"></i>}
            {(screenWidth > 481 || isMenuOpen) && <nav style={{ transform: "translateX(0)" }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>}
        </div>
    </header>
}
