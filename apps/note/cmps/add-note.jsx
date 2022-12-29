const { useState, useEffect, useRef } = React

import { noteService } from '../services/note.service.js'

export function AddNote({ note, setNotes, isEditing, setIsEditing }) {
    const [addParams, setaddParams] = useState(noteService.getDefaultNote())
    const [isWriting, setIsWriting] = useState(false || isEditing)
    const inputRef = useRef(null)
    useOutsideEvent(inputRef)

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (target.id === 'txt') {
            return setaddParams(prev => {
                prev.info.txt = value
                return { ...prev }
            })
        }
        setaddParams(prev => {
            return { ...prev, [field]: value }
        })
    }

    function useOutsideEvent(ref) {
        useEffect(() => {

            function handleOutsideEvent(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    clear()
                    if (isEditing) setIsEditing(false)
                }
            }
            document.addEventListener('mousedown', handleOutsideEvent)
            return () => {
                document.removeEventListener('mousedown', handleOutsideEvent)
            }
        }, [ref])
    }

    function addNote() {
        clear()
        if (isEditing) setIsEditing(false)
        noteService.saveNote(addParams).then(newNote => {
            if (!isEditing) return setNotes(prev => [newNote, ...prev])
            setNotes(prevNotes => {
                prevNotes[prevNotes.findIndex(note => note.id === newNote.id)] = newNote
                return [...prevNotes]
            })
        })
    }

    function clear() {
        setIsWriting(false)
        setaddParams(noteService.getDefaultNote())
    }

    return (
        <div className='add-note' ref={inputRef}>
            {isWriting && (
                <input
                    type='title'
                    placeholder='Title'
                    id='title'
                    name='title'
                    value={addParams.title}
                    onChange={handleChange}
                />
            )}
            <div className='main-input'>
                <input
                    type='text'
                    placeholder='Take a note...'
                    id='txt'
                    name='txt'
                    value={addParams.info.txt}
                    onChange={handleChange}
                    onClick={() => setIsWriting(true)}
                />
                {!isWriting && (
                    <div className='inline-utils'>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-pencil'></i>
                        </button>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-palette'></i>
                        </button>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-image'></i>
                        </button>
                    </div>
                )}
            </div>
            {isWriting && (
                <div className='utils'>
                    <div className='btns'>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-pencil'></i>
                        </button>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-palette'></i>
                        </button>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-location-dot'></i>
                        </button>
                    </div>
                    <button className='btn add-btn btn-primary' onClick={addNote}>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}