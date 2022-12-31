import { noteService } from "../services/note.service.js"

import { NoteColor } from "./note-color.jsx"

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, setNotes }) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const navigate = useNavigate()

    function onRemove(noteId) {
        noteService.remove(noteId)
            .then(() => setNotes())
    }

    function onSendMail(note) {
        navigate(`/mail/inbox/${note.info.title}/${note.info.body}`)
    }

    return <section className="note-preview" onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)} >
        <DynamicCmp note={note} setNotes={setNotes} onRemove={onRemove} onSendMail={onSendMail} isMouseOver={isMouseOver} />
    </section>
}

function DynamicCmp({ note, setNotes, onRemove, onSendMail, isMouseOver }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt note={note} setNotes={setNotes} onRemove={onRemove} onSendMail={onSendMail} isMouseOver={isMouseOver} />
        case 'note-img':
            return <NoteImg note={note} setNotes={setNotes} onRemove={onRemove} isMouseOver={isMouseOver} />
        case 'note-video':
            return <NoteVideo note={note} setNotes={setNotes} onRemove={onRemove} isMouseOver={isMouseOver} />
        case 'note-todos':
            return <NoteTodos note={note} setNotes={setNotes} onRemove={onRemove} isMouseOver={isMouseOver} />
    }
}

function NoteTxt({ note, setNotes, onRemove, onSendMail, isMouseOver }) {
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
        {isMouseOver && <div className="btns">
            <button className='btn' onClick={() => setIsColor(!isColor)}>
                <i className='fa-solid fa-palette'></i>
                {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
            </button>
            <button className='btn' onClick={() => onCopy(note.id, setNotes)}>
                <i class="fa-solid fa-clone"></i>
            </button>
            <button className='btn' onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
            <button className='btn' onClick={() => { togglePin(note, setNotes) }}><i className="fa-solid fa-thumbtack"></i></button>
            <button className='btn' onClick={() => onSendMail(note)}><i className="fa-solid fa-envelope"></i></button>
            <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
        </div>}
    </section>
}

function NoteImg({ note, setNotes, onRemove, isMouseOver }) {
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
        {isMouseOver && <div className="btns">
            <button className='btn' onClick={() => setIsColor(!isColor)}>
                <i className='fa-solid fa-palette'></i>
                {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
            </button>
            <button className='btn' onClick={() => onCopy(note.id, setNotes)}>
                <i class="fa-solid fa-clone"></i>
            </button>
            <button className='btn' onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
            <button className='btn' onClick={() => { togglePin(note, setNotes) }}><i className="fa-solid fa-thumbtack"></i></button>
            <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
        </div>}
    </section >
}

function NoteVideo({ note, setNotes, onRemove, isMouseOver }) {
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
        {isMouseOver && <div className="btns">
            <button className='btn' onClick={() => setIsColor(!isColor)}>
                <i className='fa-solid fa-palette'></i>
                {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
            </button>
            <button className='btn' onClick={() => onCopy(note.id, setNotes)}>
                <i class="fa-solid fa-clone"></i>
            </button>
            <button className='btn' onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
            <button className='btn' onClick={() => { togglePin(note, setNotes) }}><i className="fa-solid fa-thumbtack"></i></button>
            <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
        </div>}
    </section >
}

function NoteTodos({ note, setNotes, onRemove, isMouseOver }) {
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
        {isMouseOver && <div className="btns">
            <button className='btn' onClick={() => setIsColor(!isColor)}>
                <i className='fa-solid fa-palette'></i>
                {isColor && <NoteColor noteId={note.id} setNotes={setNotes} />}
            </button>
            <button className='btn' onClick={() => onCopy(note.id, setNotes)}>
                <i class="fa-solid fa-clone"></i>
            </button>
            <button className='btn' onClick={() => onRemove(note.id)}><i className="fa-solid fa-trash"></i></button>
            <button className='btn' onClick={() => { togglePin(note, setNotes) }}><i className="fa-solid fa-thumbtack"></i></button>
            <button className="save-btn" onClick={() => saveNote(data, note.id)}>Save</button>
        </div>}
    </section >
}

function saveNote(info, noteId) {
    noteService.get(noteId)
        .then(note => {
            note.info = info
            noteService.saveNote(note)
        })
}

function onCopy(noteId, setNotes) {
    noteService.get(noteId)
        .then(note => {
            const newNote = { ...note }
            newNote.id = null
            noteService.saveNote(newNote)
                .then(() => setNotes())
        })
}

function togglePin(note, setNotes) {
    note.isPinned = !note.isPinned
    noteService.saveNote(note)
        .then(() => setNotes())
}




