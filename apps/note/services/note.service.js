import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    get,
    post,
    remove,
    put,
    saveNote,
    getDefaultNote
}

const NOTES_KEY = 'notesDB'

_createNotes()

function query() {
    return storageService.query(NOTES_KEY)
}
function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}
function post(newNote) {
    return storageService.post(NOTES_KEY, newNote)
}
function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}
function put(updatedNote) {
    return storageService.put(NOTES_KEY, updatedNote)
}

function saveNote(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getDefaultNote() {
    return {
        type: 'note-txt',
        isPinned: false,
        info: {
            title: '',
            body: ''
        },
    }
}

function _createNote(title, body) {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title,
            body
        },
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('hello', 'Hello I\'m a Note'),
            _createNote('hi', 'Note number 2!'),
            _createNote('ho', 'What is this? Note number 3!'),
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)
}