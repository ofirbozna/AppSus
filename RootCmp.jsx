const { Route, Routes, useLocation } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useEffect } = React

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
import { MailList } from './apps/mail/cmps/MailList.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />}>
            <Route index element={<MailList />} />
            <Route path="/mail/:mailId" element={<MailDetails />} />
          </Route>
          <Route path="/note" element={<NoteIndex />} />
          <Route path="/note/trash" element={<NoteTrash />} />
          <Route path="/note/archive" element={<NoteArchive />} />
          <Route path="/note/filter" element={<FilterPage />} />
          <Route path="/book" element={<BookIndex />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/book/edit" element={<BookEdit />} />
          <Route path="/book/edit/:bookId" element={<BookEdit />} />
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
