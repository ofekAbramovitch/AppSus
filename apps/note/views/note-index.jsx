const { useState, useEffect } = React

import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteHeader } from '../cmps/note-header.jsx'

import { noteService } from '../services/note.service.js'


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filter, setFilter] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(getScreenWidth()))

        return () => {
          window.removeEventListener('resize', () => setScreenWidth(getScreenWidth()))
        }
    }, [])

    useEffect(() => {
        loadNotes()
    }, [filter])

    function loadNotes() {
        noteService.query(filter).then(setNotes)
    }

    function getScreenWidth() {
        const {innerWidth } = window;
        return innerWidth
    }

    return (
        <section className='note-index'>
            <NoteHeader onSetFilter={setFilter} screenWidth={screenWidth} />
            <div className="note-content ">
                <AddNote setNotes={setNotes} />
                <NoteList notes={noteService.getPinnedNotes(true, notes)} setNotes={loadNotes} />
                <NoteList notes={noteService.getPinnedNotes(false, notes)} setNotes={loadNotes} />
            </div>
        </section>
    )
}
