import { noteService } from '../services/note.service.js'
import { NoteLayout } from './NoteLayout.jsx'
const { useState, useEffect } = React

export function NoteArchive() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getNotes({ status: 'archive' }).then(setNotes)
  }, [])

  function onRestore(noteId) {
    noteService.restoreNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    })
  }

  return (
    <NoteLayout>
      <section className="notes-container">
        <h2 className="list-title">Archive</h2>

        {notes.length === 0 ? (
          <div className="empty-archive-container">
            <img src="/assets/imgs/archive-icon.png" alt="Archive Icon" className="empty-archive-icon" />
            <p className="empty-archive-message">Notes you archive will appear here</p>
          </div>
        ) : (
          <div className="note-lists-container">
            <div className="note-list">
              {notes.map((note) => (
                <div key={note.id} className="note-preview archive-note" style={{ backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white' }}>
                  <h3>{note.title ? note.title : 'Untitled'}</h3>
                  <p>{note.info && note.info.txt ? note.info.txt : 'No content'}</p>
                  <div className="note-actions-wrapper">
                    <div className="note-actions">
                      <button onClick={() => onRestore(note.id)} title="Restore">
                        <i className="fas fa-undo"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </NoteLayout>
  )
}
