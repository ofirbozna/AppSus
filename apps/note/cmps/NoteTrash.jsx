import { noteService } from '../services/note.service.js'
import { NoteLayout } from './NoteLayout.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

const { useState, useEffect } = React

export function NoteTrash() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getNotes({ status: 'trash' }).then(setNotes)
  }, [])

  function onRestore(noteId) {
    noteService.restoreNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    })
  }

  function onDeletePermanently(noteId) {
    noteService.deleteNote(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    })
  }

  return (
    <NoteLayout>
      <section className="notes-container">
        <h2 className="list-title">Trash</h2>
        <div className="note-lists-container">
          <div className="note-list">
            {notes.length === 0 ? (
              <p className="empty-trash">No notes in trash</p>
            ) : (
              notes.map(function (note) {
                return (
                  <div
                    key={note.id}
                    className="note-preview trash-note"
                    style={{
                      backgroundColor: note.style && note.style.backgroundColor ? note.style.backgroundColor : 'white',
                    }}
                  >
                    {note.type === 'note-img' ? (
                      <NoteImg note={note} />
                    ) : note.type === 'note-todos' ? (
                      <NoteTodos note={note} />
                    ) : (
                      <div>
                        <h3>{note.title || 'Untitled'}</h3>
                        <p>{note.info && note.info.txt ? note.info.txt : 'No content'}</p>
                      </div>
                    )}

                    <div className="note-actions-wrapper">
                      <div className="note-actions">
                        <button onClick={() => onRestore(note.id)} title="Restore">
                          <i className="fas fa-undo"></i>
                        </button>
                        <button onClick={() => onDeletePermanently(note.id)} title="Delete Forever">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </NoteLayout>
  )
}
