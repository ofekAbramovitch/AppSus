const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { GoogleBookList } from "../cmps/google-book-list.jsx"

import { googleBookService } from "../services/google-book.service.js"
import { utilService } from "../services/util.service.js"
import { bookService } from '../services/book.service.js'
import { AppHeader } from "../../../cmps/app-header.jsx"

export function AddBook() {
    const [books, setBooks] = useState(null)
    const [txt, setTxt] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const navigate = useNavigate()
    const debounceLoadBooks = useRef(utilService.debounce(loadBooks)) 
    
    useEffect(() => {
        loadBooks(txt)
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    }, [])
    
    function loadBooks(txt) {
        googleBookService.query(txt).then(setBooks)
    }

    function handleChange({ target }) {
        let { value } = target
        setTxt(value)
        debounceLoadBooks.current(value)
    }

    function onAddBook(bookId) {
        bookService.isHaveBook(bookId).then(isHaveBook => {
            console.log('book:', isHaveBook)
            if(!isHaveBook) {
                googleBookService.get(bookId).then(book => {
                bookService.addGoogleBook(book)
                .then(() => navigate('/book'))
        })
            }
        })
    }

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    return <section className="add-book book">
        <AppHeader screenWidth={screenWidth} />
        <form className="layout">
            <div>
                <label htmlFor="name">Book title:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="Enter book name"
                    value={txt}
                    onChange={handleChange} />
            </div>
        </form>
        <GoogleBookList books={books} onAddBook={onAddBook} />
    </section>

}