import { AddNote } from "./add-note.jsx"

const { useState, useRef } = React

export function NotePreview({ note, setNotes }) {

    // function onChangeInfo(id, info) {
    //     const notesToSave = note
    //     notesToSave[id] = info
    //     setNotes(notesToSave)
    // }


    return <section className="note-preview" style={note.style}>
        <DynamicCmp note={note} setNotes={setNotes}
            onChangeInfo={info => onChangeInfo(note.id, info)} />
    </section>
}

function DynamicCmp({note, onChangeInfo, setNotes }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt note={note} onChangeInfo={onChangeInfo} setNotes={setNotes} />
        case 'note-img':
            return <NoteImg note={note} />
        case 'note-video':
            return <NoteVideo note={note} />
        case 'note-todos':
            return <NoteTodos note={note} />
    }
}


function NoteTxt({ note, setNotes }) {
    const [isEditing, setIsEditing] = useState(false)

    return (<section className="txt-container">
        <article onClick={() => setIsEditing(true)}>
            <h5>{note.info.title}</h5>
            <p>{note.info.body}</p>
        </article>
        {isEditing && (
            <div>
                <div className="edit-note-modal">
                    <AddNote noteId={note.id} isEditing={true} setIsEditing={setIsEditing} setNotes={setNotes} />
                </div>
            </div>
        )}
    </section>

    )
}
function NoteImg({ info }) {
    return <div>NoteImg</div>
}

function NoteVideo({ info }) {
    return <div>NoteVideo</div>
}

function NoteTodos({ info }) {
    return <div>NoteTodos</div>
}



