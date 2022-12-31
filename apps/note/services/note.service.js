import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    get,
    post,
    remove,
    put,
    saveNote,
    getDefaultNote,
    getPinnedNotes
}

const NOTES_KEY = 'notesDB'

_createNotes()

function query(filter) {
    return storageService.query(NOTES_KEY).then(notes => {
        if (!filter) return notes
        const regex = new RegExp(filter, 'i')
        return notes.filter(note => regex.test(note.info.title))
    })
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

function getPinnedNotes(isPinned, notes) {
    return notes.filter(note => note.isPinned === isPinned)
}

function getDefaultNote() {
    return {
        type: 'note-txt',
        isPinned: false,
        backgroundColor: 'snow',
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
        backgroundColor: 'note.backgroundColor',
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
            _createNote('note-video', { title: 'hi', url: 'https://www.youtube.com/embed/yWCGKKtW03g' }),
            _createNote('note-todos', { title: 'todos', body: ['to clean', 'to eat', 'to finish sprint 3'] })
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)
}