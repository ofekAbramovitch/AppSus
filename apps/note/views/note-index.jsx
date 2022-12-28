const { useState, useEffect } = React

import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'

import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    if (!notes || !notes.length) return <div>Loading...</div>
    return (
        <div className='note-index'>
            <AddNote setNotes={setNotes} />
            <NoteList notes={notes} setNotes={loadNotes} />
        </div>
    )
}
