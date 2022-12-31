const { useEffect, useState } = React

const { useParams, useNavigate} = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { AppHeader } from '../../../cmps/app-header.jsx';

export function BookEdit() {
    let [book, setBook] = useState(bookService.createEmptyBook())
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))
        if(params.bookId) loadBook()

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    },[])

    function loadBook() {
        bookService.get(params.bookId).then(setBook)
        .catch((err) => {
            console.log('can not load book', err)
            navigate('/book')
        })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setBook((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleChangeListPrice({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if(type === 'checkbox' )  value = target.checked
       
        console.log('value:', value)
        setBook((prevBook) => {
            const book = { ...prevBook}
            book.listPrice[field] = value
            return book
        })
    }

    function onSubmitBook(ev) {
        ev.preventDefault()
        bookService.save(book).then((book) => {
            console.log('book1:', book)
            showSuccessMsg('Book saved!')
            navigate('/book')
        })
    }

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    return <div>
        <AppHeader screenWidth={screenWidth} />
        <section className="book-edit book">
        <h2>Add book</h2>
        <form onSubmit={onSubmitBook}>
            <div>
                <label htmlFor="title">Book title:</label>
                <input type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                value={book.title}
                onChange={handleChange}/>
            </div>
            <div>
                <div><label htmlFor="subtitle">Book subtitle:</label></div>
                <textarea type="text"
                id="subtitle"
                name="subtitle"
                placeholder="Enter subtitle"
                value={book.subtitle}
                onChange={handleChange}/>
            </div>
            <div>
                <div><label htmlFor="description">description: </label></div>
                <textarea type="text"
                id="description"
                name="description"
                placeholder="Enter description"
                value={book.description}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="thumbnail">Book url img:</label>
                <input type="url"
                id="thumbnail"
                name="thumbnail"
                placeholder="Enter url"
                value={book.thumbnail}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pageCount">Number of page: </label>
                <input type="number"
                id="pageCount"
                name="pageCount"
                value={book.pageCount}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="language">Book language:</label>
                <input type="text"
                id="language"
                name="language"
                placeholder="Enter language"
                value={book.language}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="amount">price:</label>
                <input type="number"
                id="amount"
                name="amount"
                placeholder="By price"
                value={book.listPrice.amount}
                onChange={handleChangeListPrice}/>
            </div>
            <div>
                <label htmlFor="currencyCode">currencyCode: </label>
                <input type="text"
                id="currencyCode"
                name="currencyCode"
                value={book.listPrice.currencyCode}
                onChange={handleChangeListPrice}/>
            </div>
            <div>
                <label htmlFor="isOnSale">Is on sale: </label>
                <input type="checkbox"
                id="isOnSale"
                name="isOnSale"
                value={book.listPrice.isOnSale ? 'on' : 'off'}
                onChange={handleChangeListPrice}/>
            </div>
            <button>Save books</button>
        </form>
    </section>
    </div>
    
}