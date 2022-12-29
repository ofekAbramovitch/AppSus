const { Link } = ReactRouterDOM

import { AppHeader } from "../cmps/app-header.jsx"

export function Home() {

    return <div>
        <AppHeader />
        <section className="home">
        <div className="home-content layout">
            <h1>Welcome to Appsus</h1>
            <div>
            <Link to="/note"><img  src="./assets/img/note.webp"/></Link>
            <Link to="/book"><img src="./assets/img/book.png"/></Link>
            <Link to="/mail/inbox"><img  src="./assets/img/gmail.png"/></Link>
            </div>
        </div>
    </section>
    </div>
    
}