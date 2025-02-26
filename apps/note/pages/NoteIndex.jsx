import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingNote, setEditingNote] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultSearchParams(searchParams))

  useEffect(() => {
    loadNotes(filterBy)
  }, [filterBy]) // ✅ No more infinite loop

  function loadNotes(filterBy) {
    noteService.getNotes(filterBy).then(setNotes)
  }

  function onSetFilterBy(newFilterBy) {
    setFilterBy(newFilterBy)
    setSearchParams(newFilterBy) // ✅ Updates URL but doesn't cause infinite re-renders
  }

  function onRemoveNote(noteId) {
    noteService
      .deleteNote(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg('Note Removed')
      })
      .catch((err) => {
        console.log('Problem removing note', err)
        showErrorMsg('Problem removing note')
      })
  }

  function onAddNote(newNote) {
    setNotes((prevNotes) => [newNote, ...prevNotes])
  }

  function onUpdateNote(updatedNote) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setEditingNote(null)
  }

  function onEdit(note) {
    console.log('Editing note:', note)
    setEditingNote(note)
  }

  function onCloseEdit() {
    console.log('Closing editor')
    setEditingNote(null)
  }

  function onChangeColor(noteId, color) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? { ...note, style: { backgroundColor: color } } : note)))

    noteService.getNote(noteId).then((note) => {
      if (note) {
        if (!note.style) note.style = {}
        note.style.backgroundColor = color
        noteService.saveNote(note)
      }
    })
  }

  return (
    <section className="notes-container">
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <AddNote onAddNote={onAddNote} />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onEdit={onEdit} onChangeColor={onChangeColor} />
      {editingNote && <NoteEdit note={editingNote} onClose={onCloseEdit} onUpdateNote={onUpdateNote} />}
    </section>
  )
}
