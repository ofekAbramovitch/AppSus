

export function MailCompose() {

    function onSubmit() {

    }

    return <section className="mail-compose">
        <h3>New massage</h3>
        <form onSubmit={onSubmit}>
            <div>
                <input type="text"
                id="to"
                placeholder="To:"
                // value={book.title}
                // onChange={handleChange}
                />
            </div>
            <div>
                <textarea type="text"
                id="subtitle"
                placeholder="Subtitle"
                // value={book.subtitle}
                // onChange={handleChange}
                />
            </div>
            <div>
                <textarea type="text"
                id="body"
                // value={book.description}
                // onChange={handleChange}
                />
            </div>
        </form>
    </section>
}