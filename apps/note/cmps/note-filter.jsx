const { useState } = React

export function NoteFilter({ onSetFilter }) {
    const [filter, setFilter] = useState({ txt: '' })


    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filter)
    }

    return <section className="note-filter">
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
        </form>
    </section>
}