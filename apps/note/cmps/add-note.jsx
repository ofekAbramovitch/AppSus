const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { loadImageFromInput } from '../services/upload.service.js'

export function AddNote({ setNotes, isEditing, setIsEditing, noteId, params, setMail }) {
    const [addParams, setAddParams] = useState(noteService.getDefaultNote())
    const [isWriting, setIsWriting] = useState(false || isEditing)
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const uploadImgInputRef = useRef(null)
    const mainTextAreaRef = useRef(null)
    useOutsideEvent(inputRef)

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setAddParams(prev => {
            prev.info[field] = value
            return { ...prev }
        })
    }

    function onLoadNote(noteId) {
        noteService.get(noteId)
            .then(setAddParams)
    }

    function useOutsideEvent(ref) {
        useEffect(() => {
            if (params) setAddParams(prev => {
                setIsWriting(true)
                prev.info.title = params.mailTitle
                prev.info.body = params.mailBody
                return prev
            })
            if (noteId) onLoadNote(noteId)
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
        noteService.saveNote(addParams)
            .then(newNote => {
                if (!isEditing) return setNotes(prev => [newNote, ...prev])
                setNotes(prevNotes => {
                    prevNotes[prevNotes.findIndex(note => note.id === newNote.id)] = newNote

                    return [...prevNotes]
                })
            })
    }

    function clear() {
        setIsWriting(false)
        setAddParams(noteService.getDefaultNote())
        mainTextAreaRef.current.value = ''
        if (params) {
            setMail(false)
            navigate('/note')
        }
    }

    function updateParamsSrc(img) {
        addParams.info.url = img.src
        addParams.type = 'note-img'
        setAddParams({ ...addParams })
    }

    function onUploadImg(ev) {
        loadImageFromInput(ev, updateParamsSrc)
        setIsWriting(true)
    }

    function onYoutube() {
        setIsWriting(true)
        mainTextAreaRef.current.focus()
        mainTextAreaRef.current.placeholder = 'Enter a Youtube Link...'
        mainTextAreaRef.current.name = 'url'
        mainTextAreaRef.current.id = 'url'
    }

    return (
        <div className='add-note layout' ref={inputRef}>
            {addParams.info.url && <img src={addParams.info.url} />}
            {isWriting && (
                <input
                    type='title'
                    placeholder='Title'
                    id='title'
                    name='title'
                    value={addParams.info.title}
                    onChange={handleChange}
                />
            )
            }
            <textarea
                type='title'
                placeholder='Take a note...'
                id='body'
                name='body'
                rows={isEditing ? 3 : isWriting ? 2 : 1}
                value={addParams.info.body || addParams.info.url}
                onChange={handleChange}
                onClick={() => setIsWriting(true)}
                ref={mainTextAreaRef}
            />
            {
                !isWriting && (
                    <div className='inline-utils'>
                        <button className='btn btn-rnd-s' onClick={onYoutube}>
                            <i className='fa-brands fa-youtube'></i>
                        </button>
                        <button className='btn btn-rnd-s' onClick={() => uploadImgInputRef.current.click()}>
                            <i className='fa-solid fa-image'></i>
                        </button>
                        <input
                            type='file'
                            className='file-input btn'
                            name='image'
                            id='image'
                            hidden
                            ref={uploadImgInputRef}
                            onChange={onUploadImg}
                        />
                    </div>
                )
            }
            {isWriting && (
                <div className='utils'>
                    <div className='btns'>
                        <button className='btn btn-rnd-s'>
                            <i className='fa-solid fa-palette'></i>
                        </button>
                        <button className='btn btn-rnd-s' onClick={onYoutube}>
                            <i className='fa-brands fa-youtube'></i>
                        </button>
                        <button className='btn btn-rnd-s' onClick={() => uploadImgInputRef.current.click()}>
                            <i className='fa-solid fa-image'></i>
                        </button>
                        <input
                            type='file'
                            className='file-input btn'
                            name='image'
                            id='image'
                            hidden
                            ref={uploadImgInputRef}
                            onChange={onUploadImg}
                        />
                    </div>
                    <button className='btn add-btn btn-primary' onClick={addNote}>
                        Save
                    </button>
                </div>
            )
            }
        </div >
    )
}