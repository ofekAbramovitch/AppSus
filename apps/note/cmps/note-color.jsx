
import { noteService } from "../services/note.service.js"

export function NoteColor({noteId, setNotes}) {
    function changeColor(color) {
        noteService.get(noteId)
        .then(note => {
            note.backgroundColor = color
            console.log(note)
            noteService.saveNote(note).then(() => setNotes())
        })
}


    return <section className="note-color">
        <div onClick={() => changeColor('red')} style={{ backgroundColor: "red" }}></div>
        <div style={{ backgroundColor: "blue" }}></div>
        <div style={{ backgroundColor: "green" }}></div>
        <div style={{ backgroundColor: "gold" }}></div>
        <div style={{ backgroundColor: "aqua" }}></div>
    </section >
}