import { NotePreview } from './note-preview.jsx'

import { noteService } from "../services/note.service.js"

export function NoteList({ notes, setNotes }) {
    if (!notes || !notes.length) return <div>Loading...</div>

    function onRemove(noteId) {
         noteService.remove(noteId)
            .then(() => setNotes())
    }

    return (
        <ul className="note-list clean-list">
            {
                notes.map(note => <li key={note.id}>
                    <NotePreview note={note} />
                    <div>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-pencil'></i>
                        </button>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-palette'></i>
                        </button>
                        <button onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
                        <button><i className="fa-solid fa-thumbtack"></i></button>
                    </div>
                </li >
                )
            }
        </ul >
    )
}