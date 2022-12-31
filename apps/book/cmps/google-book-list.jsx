import { Loading } from './loading.jsx';

export function GoogleBookList({ books,  onAddBook}) {
    if(!books) return <Loading />
    return <ul className="google-book-list layout">
        {
            books.map(book => <li key={book.id}>
               {book.title}
                <button onClick={() => onAddBook(book.id)}>+</button>
            </li>)
        }
    </ul>
}