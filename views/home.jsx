const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { AppHeader } from "../cmps/app-header.jsx"

export function Home() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    }, [])

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }
    return <div>
        <AppHeader screenWidth={screenWidth} />
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