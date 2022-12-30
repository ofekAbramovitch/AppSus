
import { noteService } from "../services/note.service.js"

export function NoteColor({noteId, setNotes}) {
    function changeColor(color) {
        noteService.get(noteId)
        .then(note => {
            note.backgroundColor = color
            noteService.saveNote(note).then(() => setNotes())
        })
}

    return <section className="note-color">
        <div onClick={() => changeColor('red')} style={{ backgroundColor: "red" }}></div>
        <div onClick={() => changeColor('blue')} style={{ backgroundColor: "blue" }}></div>
        <div onClick={() => changeColor('green')} style={{ backgroundColor: "green" }}></div>
        <div onClick={() => changeColor('gold')} style={{ backgroundColor: "gold" }}></div>
        <div onClick={() => changeColor('aqua')} style={{ backgroundColor: "aqua" }}></div>
    </section >
}