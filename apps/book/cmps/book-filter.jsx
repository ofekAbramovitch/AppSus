const { useState, useEffect } = React

export function BookFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ name: '', price: '' })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter">
        <h2>Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <div>
                <label htmlFor="name">Book title:</label>
                <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="price">Max-price:</label>
                <input type="number"
                id="price"
                name="price"
                placeholder="By price"
                value={filterByToEdit.price}
                onChange={handleChange}/>
            </div>
            <button>Filter books</button>
        </form>
    </section>
}
