const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { FilterPage } from './apps/note/cmps/FilterPage.jsx'
import { NoteTrash } from './apps/note/cmps/NoteTrash.jsx'
import { NoteArchive } from './apps/note/cmps/NoteArchive.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/note" element={<NoteIndex />} />
          <Route path="/note/trash" element={<NoteTrash />} />
          <Route path="/note/archive" element={<NoteArchive />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/mail/:mailId" element={<MailDetails />} />
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
