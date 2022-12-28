import { NoteHeader } from "../cmps/note-header";
import { NoteList } from "../cmps/note-list";

import { noteService } from "../services/note.service";

export function NoteIndex() {

    return <section>
        <NoteHeader />
        <NoteList />
    </section>

}
