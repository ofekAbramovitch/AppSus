
import { MailList } from "../cmps/mail-list.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailFolderList} from "../cmps/mail-folder-list.jsx"

export function MailIndex() {
    return <section className="mail-app">
        <MailHeader />
        <MailList />
        <MailFolderList />
    </section>




}

