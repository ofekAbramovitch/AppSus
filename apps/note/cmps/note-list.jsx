import { NotePreview } from './note-preview.jsx'

import { noteService } from "../services/note.service.js"

export function NoteList({ notes, setNotes }) {
    return (
        <ul className="note-list clean-list layout">
            {
                notes.map(note => <li key={note.id} style={{ backgroundColor: note.backgroundColor }}>
                    <NotePreview note={note} setNotes={setNotes} />
                </li >
                )
            }
        </ul >
    )
}