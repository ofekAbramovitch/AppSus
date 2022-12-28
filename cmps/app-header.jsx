const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <div className="logo">
                    <img src="./assets/img/home-logo.png" alt="" />
                    <h3>Appsus</h3>
                </div>
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </div>
    </header>
}
