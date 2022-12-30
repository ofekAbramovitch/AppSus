const { useState, useRef } = React

import { utilService } from "../../../services/util.service.js"

export function NoteFilter({ onSetFilter }) {
    const [filter, setFilter] = useState({ txt: '' })
    const debounceLoadNotes = useRef(utilService.debounce(onSetFilter))

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))
        debounceLoadNotes.current(value)
    }

    return <section className="note-filter">
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
    </section>
}