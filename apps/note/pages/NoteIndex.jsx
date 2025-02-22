import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from './cmps/AddNote.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    document.body.style.backgroundColor = '#121212'
    document.body.style.color = 'white'

    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.getNotes().then((notes) => {
      setNotes(notes)
    })
  }
  function onRemoveNote(noteId) {
    noteService
      .deleteNote(noteId)
      .then(() => {
        setNotes((prevNote) => prevNote.filter((note) => note.id !== noteId))

        showSuccessMsg('Note Removed')
      })
      .catch((err) => {
        console.log('Problem removing book', err)
        showErrorMsg('Problems removing book')
      })
  }

  function onAddNote(newNote) {
    setNotes((prevNotes) => [newNote, ...prevNotes])
  }

  return (
    <section className="notes-container">
      <AddNote onAddNote={onAddNote} />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>
  )
}
