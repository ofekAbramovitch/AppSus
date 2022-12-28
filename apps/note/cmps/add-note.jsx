const { useState, useEffect, useRef } = React

import { noteService } from '../services/note.service.js'

export function AddNote({ setNotes }) {
    const [addNodeParams, setAddNodeParams] = useState(noteService.getDefaultNote())
    const [isWriting, setIsWriting] = useState(false)
    const inputRef = useRef(null)
    useOutsideEvent(inputRef)
    
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (target.id === 'txt') {
            return setAddNodeParams(prev => {
                prev.info.txt = value
                return { ...prev }
            })
        }
        setAddNodeParams(prev => {
            return { ...prev, [field]: value }
        })
    }

    function useOutsideEvent(ref) {
        useEffect(() => {

            function handleOutsideEvent(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsWriting(false)
                    setAddNodeParams(noteService.getDefaultNote())
                }
            }
            document.addEventListener('mousedown', handleOutsideEvent)
            return () => {
                document.removeEventListener('mousedown', handleOutsideEvent)
            }
        }, [ref])
    }

    function addNote() {
        setIsWriting(false)
        setAddNodeParams(noteService.getDefaultNote())

        noteService.saveNote(addNodeParams).then(newNote => {
            setNotes(prev => [newNote, ...prev])
        })
    }

    return (
        <div className='add-note' ref={inputRef}>
            {isWriting && (
                <input
                    type='title'
                    placeholder='Title'
                    id='title'
                    name='title'
                    value={addNodeParams.txt}
                    onChange={handleChange}
                />
            )}
            <div className='main-input'>
                <input
                    type='text'
                    placeholder='Take a note...'
                    id='txt'
                    name='txt'
                    value={addNodeParams.txt}
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
                            <i className='fa-solid fa-location-dot'></i>
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
                        Add
                    </button>
                </div>
            )}
        </div>
    )
}