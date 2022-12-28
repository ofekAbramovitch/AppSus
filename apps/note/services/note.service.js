import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

_createNotes()

export const noteService = {
    query,
    get,
    post,
    remove,
    put,
}

const NOTES_KEY = 'notesDB'

const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#aecbfa"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        id: "n104",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "#fff"
        }
    },
    {
        id: "n105",
        type: "note-todos",
        info: {
            label: "House missions",
            todos: [
                { txt: "Wash the dishes", doneAt: null },
                { txt: "Clean my room", doneAt: null },
                { txt: "Clean the garden", doneAt: null }
            ]
        },
        style: {
            backgroundColor: "#ccff90"
        }
    },
    {
        id: "n106",
        type: "note-video",
        info: {
            txt: "Get my stuff together",
            url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ig5oMN4XQz4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        },
        style: {
            backgroundColor: "#fff"
        }
    },
    {
        id: "n107",
        type: "note-img",
        info: {
            url: 'assets/img/noteImgs/garden.jpeg',
            title: "My garden"
        },
        style: {
            backgroundColor: "#fff"
        },

    },
    {
        id: "n108",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Surprise party for Kristin!"
        },
        style: {
            backgroundColor: "#fff"
        }
    },
    {
        id: "n109",
        type: "note-todos",
        isPinned: true,
        info: {
            label: "Gift ideas",
            todos: [
                { txt: "New bike helmet", doneAt: null },
                { txt: "Cute houseplant", doneAt: null },
                { txt: "Picture frame", doneAt: null },
                { txt: "Bottle of Whiskey", doneAt: null }
            ]
        },
        style: {
            backgroundColor: "#fff"
        }
    },
    {
        id: "n110",
        type: "note-img",
        info: {
            url: 'assets/img/noteImgs/maldivies.jpeg',
            title: "Possible destination"
        },
        style: {
            backgroundColor: "#fff"
        },

    },
];


function _createNotes() {
    let currNotes = utilService.loadFromStorage(NOTES_KEY)
    if (!currNotes || !currNotes.length) {
        currNotes = notes
        utilService.saveToStorage(NOTES_KEY, notes)
    }
}

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