

export function NotePreview({ note }) {

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



