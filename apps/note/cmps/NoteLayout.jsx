import { NotesSidebar } from './NotesSideBar.jsx'

export function NoteLayout({ children }) {
  return (
    <div className="note-layout">
      <div className="note-side-bar">
        <NotesSidebar />
      </div>
      <div className="note-main">{children}</div>
    </div>
  )
}
