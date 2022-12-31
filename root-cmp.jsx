const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { BookIndex } from "./apps/book/pages/book-index.jsx"
import { BookEdit } from "./apps/book/cmps/book-edit.jsx"
import { BookDetails } from "./apps/book/cmps/book-details.jsx"
import { AddBook } from "./apps/book/pages/add-book.jsx"



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
                    <Route path="trash" element={<MailIndex />} />
                    <Route path="draft" element={<MailIndex />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailIndex />} />
                <Route path="/mail/inbox/:noteTitle/:noteBody" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:mailTitle/:mailBody" element={<NoteIndex />} />
                <Route path="/book">
                    <Route index element={<BookIndex />}/>
                    <Route path="edit" element={<BookEdit />} />
                    <Route path="edit/:bookId" element={<BookEdit />} />
                    <Route path="addBook" element={<AddBook />} />
                </Route>
                <Route path="/book/:bookId" element={<BookDetails />} />
            </Routes>
        </section>
    </Router>
}
