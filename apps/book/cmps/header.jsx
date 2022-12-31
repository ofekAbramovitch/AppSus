const { NavLink } = ReactRouterDOM

export function Header() {
    return <header className="app-header">
        <div className='header-content layout'>
            <h1>My Book App</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/book">Book</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
        </div>
    </header>
}