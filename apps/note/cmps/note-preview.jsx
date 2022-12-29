import { noteService } from "../services/note.service.js"

import { NoteColor } from "./note-color.jsx"

const { useState } = React

export function NotePreview({ note, setNotes }) {
    // function onChangeInfo(id, info) {
    //     const notesToSave = note
    //     notesToSave[id] = info
    //     setNotes(notesToSave)
    // }

    function onRemove(noteId) {
        noteService.remove(noteId)
            .then(() => setNotes())
    }

    return <section className="note-preview" >
        <DynamicCmp note={note} setNotes={setNotes} onRemove={onRemove}
            onChangeInfo={info => onChangeInfo(note.id, info)} />
    </section>
}

function DynamicCmp({ note, onChangeInfo, setNotes, onRemove = { onRemove } }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt note={note} onChangeInfo={onChangeInfo} setNotes={setNotes} onRemove={onRemove} />
        case 'note-img':
            return <NoteImg note={note} />
        case 'note-video':
            return <NoteVideo note={note} />
        case 'note-todos':
            return <NoteTodos note={note} />
    }
}

function NoteTxt({ note, setNotes, onRemove }) {
    const [data, setData] = useState(note.info)
    const [isColor, setIsColor] = useState(false)
    return <section className="txt-container">
        {<article>
            <div>
                <blockquote onBlur={ev => setData({ ...data, title: ev.target.innerText })} contentEditable="true">
                    <h5>{note.info.title}</h5>
                </blockquote>
            </div>
            <div>
                <blockquote onBlur={ev => setData({ ...data, body: ev.target.innerText })} contentEditable="true">
                    <p>{note.info.body}</p>
                </blockquote>
            </div>
        </article>}
        <button className='btn btn-rnd-s' onClick={() => setIsColor(!isColor)}>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
        <button><i className="fa-solid fa-thumbtack"></i></button>
        {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
        <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
    </section>
}

function NoteImg({ note }) {
    const [data, setData] = useState(note.info)
    return <section className="img-container">
        {<article>
            < div>
                <blockquote onBlur={ev => setData({ ...data, title: ev.target.innerText })} contentEditable="true">
                    <h5>{note.info.title}</h5>
                </blockquote>
            </div>
            <blockquote onBlur={ev => setData({ ...data, url: ev.target.src })} contentEditable="true">
                <img src={`${note.info.url}`} />
            </blockquote>
        </article>}
        <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>

    </section >
}

function NoteVideo({ info }) {
    return <div>NoteVideo</div>
}

function NoteTodos({ info }) {
    return <div>NoteTodos</div>
}

function saveNote(info, noteId) {
    noteService.get(noteId)
        .then(note => {
            note.info = info
            noteService.saveNote(note)
        })
}





