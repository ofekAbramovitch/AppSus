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
        backgroundColor: 'yellow',
        info: {
            title: '',
            body: ''
        },
    }
}

function _createNote(type, info) {
    return {
        id: utilService.makeId(),
        type,
        isPinned: false,
        backgroundColor: 'gainsboro',
        info,
    }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('note-txt', { title: 'hello', body: 'Hello I\'m a Note' }),
            _createNote('note-txt', { title: 'hi', body: 'Note number 2!' }),
            _createNote('note-img', { title: 'ho', url: 'https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1207206237.jpg?w=730&crop=1' }),
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)
}