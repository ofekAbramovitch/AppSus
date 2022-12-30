const { useState } = React



export function MailFilter({ onSetFilter }) {
    const[filter, setFilter] = useState({txt: '', isRead: ''})


    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filter)
    }


    return <section className="mail-filter">
        <form onSubmit={onSubmit}>
            <button><i className="fa fa-search form-control-feedback"></i></button>
            <div>
                <input type="text"
                id="txt"
                name="txt"
                placeholder="Search"
                value={filter.txt}
                onChange={handleChange}
                />
            </div>
            <select name="is-read" id="is-read" value={filter.isRead} onChange={handleChange}>
                <option value={''}>All</option>
                <option value={true}>Read</option>
                <option value={false}>Not read</option>
            </select>
        </form>
        
    </section>
}