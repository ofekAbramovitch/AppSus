const { useState, useEffect } = React

import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteHeader } from '../cmps/note-header.jsx'

import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        loadNotes()
    }, [filter])

    function loadNotes() {
        noteService.query(filter).then(setNotes)
    }

    return (
        <section className='note-index'>
            <NoteHeader onSetFilter={setFilter} />
            <div className="note-content layout">
                <AddNote setNotes={setNotes} />
                <NoteList notes={noteService.getPinnedNotes(true, notes)} setNotes={loadNotes} />
                <NoteList notes={noteService.getPinnedNotes(false, notes)} setNotes={loadNotes} />
            </div>
        </section>
    )
}
