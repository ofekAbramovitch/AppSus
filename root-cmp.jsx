const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"



export function App() {
    return <Router>
        <section className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="inbox" element={<MailIndex />} />
                    <Route path="starred" element={<MailIndex />} />
                    <Route path="sent-mail" element={<MailIndex />} />
                    <Route path="draft" element={<MailIndex />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailIndex />} />
                <Route path="/mail/inbox/:noteTitle/:noteBody" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
