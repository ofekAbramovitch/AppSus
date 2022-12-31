import { BookPreview } from "./book-preview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books,  onRemoveBook}) {

    return <ul className="book-list">
        {
            books.map(book => <li key={book.id}>
                <BookPreview book={book} />
                <div>
                    <button onClick={() => onRemoveBook(book.id)}>Remove book!</button>
                    <button><Link to={`/book/${book.id}`}>Select book!</Link></button>
                </div>
            </li>)
        }
    </ul>
}