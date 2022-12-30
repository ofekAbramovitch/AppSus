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
            return <NoteImg note={note} setNotes={setNotes} onRemove={onRemove} />
        case 'note-video':
            return <NoteVideo note={note} setNotes={setNotes} onRemove={onRemove} />
        case 'note-todos':
            return <NoteTodos note={note} setNotes={setNotes} onRemove={onRemove} />
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

function NoteImg({ note, setNotes, onRemove }) {
    const [data, setData] = useState(note.info)
    const [isColor, setIsColor] = useState(false)
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
        <button className='btn btn-rnd-s' onClick={() => setIsColor(!isColor)}>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
        <button><i className="fa-solid fa-thumbtack"></i></button>
        {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
        <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
    </section >
}

function NoteVideo({ note, setNotes, onRemove }) {
    const [data, setData] = useState(note.info)
    const [isColor, setIsColor] = useState(false)
    return <section className="vid-container">
        {<article>
            < div>
                <blockquote onBlur={ev => setData({ ...data, title: ev.target.innerText })} contentEditable="true">
                    <h5>{note.info.title}</h5>
                </blockquote>
            </div>
            <blockquote onBlur={ev => setData({ ...data, url: ev.target.src })} contentEditable="true">
                <iframe
                    width="90%"
                    height="auto"
                    src={note.info.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </blockquote>
        </article>}
        <button className='btn btn-rnd-s' onClick={() => setIsColor(!isColor)}>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
        <button><i className="fa-solid fa-thumbtack"></i></button>
        {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
        <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>

    </section >
}

function NoteTodos({ note, setNotes, onRemove }) {
    const [data, setData] = useState(note.info)
    const [isColor, setIsColor] = useState(false)
    return <section className="todos-container">
        {<article>
            < div>
                <blockquote onBlur={ev => setData({ ...data, title: ev.target.innerText })} contentEditable="true">
                    <h5>{note.info.title}</h5>
                </blockquote>
            </div>
            <ul>
                {note.info.body.map((todo, idx) => {
                    return <blockquote onBlur={ev => setData(() => {
                        const body = data.body
                        body[idx] = ev.target.innerText
                        return data
                    })} contentEditable="true">
                        <li key={idx}>{todo}</li>
                    </blockquote>
                })}
            </ul>
        </article>}
        <button className='btn btn-rnd-s' onClick={() => setIsColor(!isColor)}>
            <i className='fa-solid fa-palette'></i>
        </button>
        <button onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
        <button><i className="fa-solid fa-thumbtack"></i></button>
        {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
        <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
    </section >
}

function saveNote(info, noteId) {
    noteService.get(noteId)
        .then(note => {
            note.info = info
            noteService.saveNote(note)
        })
}





