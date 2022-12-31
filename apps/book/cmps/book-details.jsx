const { useEffect, useState } = React
const { useParams, useNavigate, Link} = ReactRouterDOM


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { bookService } from '../services/book.service.js'
import { utilService } from '../../../services/util.service.js';

import { LongTxt } from "./long-txt.jsx"
import { AddReview } from "./add-review.jsx"
import { ReviewList } from "./review-list.jsx"
import { Loading } from './loading.jsx';
import { AppHeader } from '../../../cmps/app-header.jsx';

export function BookDetails() {
    let [book, setBook] = useState(null)
    let [isAddReview, setIsAddReview] = useState(false)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))
        loadBook()

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    },[bookId])

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    function loadBook() {
        bookService.get(bookId).then(setBook)
        .catch((err) => {
            console.log('can not load book', err)
            navigate('/book')
        })
        bookService.getNextPrevBookId(bookId, 1)
            .then(setNextBookId)
        bookService.getNextPrevBookId(bookId, -1)
        .then(setPrevBookId)
    }

    function pageCount() {
        const pageCount = book.pageCount
        if(pageCount > 500) return `${pageCount} (Serious Reading)`
        if(pageCount > 200) return `${pageCount} (Descent Reading)`
        if(pageCount < 100) return `${pageCount} (Light Reading)`
        else return pageCount
    }

    function  publishedDate() {
        const publishedDate = book.publishedDate
        const currYear = (new Date()).getFullYear()
        
        if(currYear - publishedDate > 10) return `${publishedDate} (Vintage)`
        if(currYear - publishedDate < 1) return `${publishedDate} (New)`
        else return publishedDate
    }

    function priceClass() {
        const price = +book.listPrice.amount
        if(price > 150) return 'red'
        if(price < 20) return 'green'
        else return ''
    }

    function onRemoveReview(reviewId) {
        const reviews = book.reviews.filter(review => review.id !== reviewId)
        const bookToSave =  { ...book, 'reviews': reviews }
        bookService.save(bookToSave).then((book) => {
            setBook(book)
            showSuccessMsg('Review deleted!')
        })
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('can not remove review')
        })
    }

    if(!book) return <Loading />
    return <div>
        <AppHeader screenWidth={screenWidth} />
    <section className="book-details book">
        <div className="flex-details">
            <div className="details-container">
                <h1>{book.title}</h1>
                <h3>subtitle: {book.subtitle}</h3>
                <h3>authors</h3>
                <ul>
                {book.authors.map((author, idx) => <li key={idx}>{author}</li>)}
                </ul>
                <h3>publishedDate: {publishedDate()}</h3>
                <img src={book.thumbnail} />
                <h3>description: <LongTxt txt={book.description}/></h3>
                <h3>categories</h3>
                <ul>
                {book.categories.map((category, idx) => <li key={idx}>{category}</li>)}
                </ul>
                <h3 className={priceClass()}>price: {utilService.getPrice(book.listPrice.amount, book.language, book.listPrice.currencyCode)}</h3>
                <h3>Number of page: {pageCount()}</h3>
                <h3>is on sale: {book.listPrice.isOnSale ? 'yes' : 'no'}</h3>
                <div>
                    <button onClick={() => navigate('/book')}>Go back</button>
                    <button><Link to={`/book/edit/${book.id}`}>Update book</Link></button>
                    <button><Link to={`/book/${prevBookId}`}>Prev book</Link></button>
                    <button><Link to={`/book/${nextBookId}`}>Next book</Link></button>
                </div>
                {isAddReview && <AddReview book={book} setBook={setBook} setIsAddReview={setIsAddReview} />}
            <button onClick={() => setIsAddReview((prev) => !prev)}>{!isAddReview ? 'Add review' : 'Close'}</button>
            </div>
        </div>
        <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview}/>
    </section>
    </div> 
}