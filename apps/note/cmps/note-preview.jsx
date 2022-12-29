const { useState, useRef } = React

export function NotePreview({ note, setNotes, removeNote }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isInPalette, setIsInPalette] = useState(false)
    const noteRef = useRef(null)
   
    function setColor(ev, color) {
        ev.stopPropagation()
        note.style = { ...note.style }
        note.style.backgroundColor = color
        noteService.saveNote(note).then(newNote => {
            setNotes(prevNotes => {
                prevNotes[prevNotes.findIndex(note => note.id === newNote.id)] = newNote
                return [...prevNotes]
            })
        })
    }

    function onRemoveNote(ev) {
        ev.stopPropagation()
        removeNote(note.id)
    }

    function onHover(ev) {
        noteRef.current.classList.add('z-2')
    }
    function onHoverLeave(ev) {
        noteRef.current.classList.remove('z-2')
    }

    return <section className="note-preview">
        <DynamicCmp type={note.type} info={note.info}
            onChangeInfo={info => onChangeInfo(note.id, info)} />
    </section>
}

function DynamicCmp({ type, info }) {
    switch (type) {
        case 'note-txt':
            return <NoteTxt info={info} />
        case 'note-img':
            return <NoteImg info={info} />
        case 'note-video':
            return <NoteVideo info={info} />
        case 'note-todos':
            return <NoteTodos info={info} />
    }
}

function NoteTxt({ info }) {
    return <div>{info.txt}</div>
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



