const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

import { BookList } from '../cmps/book-list.jsx';
import { BookFilter } from '../cmps/book-filter.jsx';
import { AppHeader } from '../../../cmps/app-header.jsx';

export function BookIndex () {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState({ name: '', price: '' })
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    }, [])

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            showSuccessMsg('Book removed!')
            setBooks(updatedBooks)})
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
    }

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    return <section className="book-index book">
        <AppHeader screenWidth={screenWidth} />
        <div className='layout book-content'> 
            <BookFilter onSetFilter={onSetFilter} />
            <button><Link to="/book/edit">Add book!</Link></button>
            <button><Link to="/book/addBook">Add google book!</Link></button>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </div>
    </section>
}