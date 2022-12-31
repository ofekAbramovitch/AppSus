
export function ReviewList({ reviews ,onRemoveReview}) {

    return <ul className="review-list">
        {
            reviews.map(review => <li key={review.id}>
                    <h3>full-name: {review.name}</h3>
                    <h3>rate: <span>{'⭐'.repeat(review.rate)}</span></h3>
                    <h3>date: {review.readAt}</h3>
                    <button onClick={() => onRemoveReview(review.id)}>Remove review!</button>
            </li>)
        }
    </ul>
}