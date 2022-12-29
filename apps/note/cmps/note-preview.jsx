const { useState, useRef } = React

export function NotePreview({ note }) {

    const [isEditing, setIsEditing] = useState(false)

    function onChangeInfo(id, info) {
        const notesToSave = note
        notesToSave[id] = info
        setNotes(notesToSave)
    }

    return <section className="note-preview" style={note.style} onClick={() => setIsEditing(true)}>
        <DynamicCmp type={note.type} info={note.info}
            onChangeInfo={info => onChangeInfo(note.id, info)} />
    </section>
}

function DynamicCmp({ type, info, onChangeInfo }) {
    switch (type) {
        case 'note-txt':
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} />
        case 'note-img':
            return <NoteImg info={info} />
        case 'note-video':
            return <NoteVideo info={info} />
        case 'note-todos':
            return <NoteTodos info={info} />
    }
}

function NoteTxt({ info, onChangeInfo }) {
    return <label className="txt-container">
        <div onChange={ev => { onChangeInfo(ev.target.value) }}>
            {console.log(info)}
            <h5>{info.title}</h5>
            <p>{info.body}</p>
        </div>
    </label>
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



