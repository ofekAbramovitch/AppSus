import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
    if (!notes || !notes.length) return <div>Loading...</div>

    return (
        <ul className="note-list">
    {
        notes.map(note => <li key={note.id}>dfgdfgdfg
        
            <MailPreview note={note} />
        </li>)
    }
    </ul>
    )
}