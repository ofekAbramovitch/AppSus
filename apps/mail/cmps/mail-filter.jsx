const { useState } = React



export function MailFilter({ onSetFilter }) {
    const[filter, setFilter] = useState('')

    function handleChange({ target }) {
        let { value } = target
        setFilter(value)
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
                value={filter}
                onChange={handleChange}
                />
            </div>
        </form>
        
    </section>
}