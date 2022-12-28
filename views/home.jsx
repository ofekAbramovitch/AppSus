const { Link } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <div className="home-content layout">
            <h1>Welcome to Appsus</h1>
            <div>
            <Link to="/note"><img  src="./assets/img/note.webp"/></Link>
            <Link to="/book"><img src="./assets/img/book.png"/></Link>
            <Link to="/mail"><img  src="./assets/img/gmail.png"/></Link>
            </div>
        </div>
        
    </section>
}