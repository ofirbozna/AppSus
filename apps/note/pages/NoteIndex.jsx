import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NotesSidebar } from '../cmps/NotesSideBar.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [editingNote, setEditingNote] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultSearchParams(searchParams))

  useEffect(() => {
    loadNotes(filterBy)
  }, [filterBy])

  function loadNotes(filterBy) {
    noteService.getNotes(filterBy).then(setNotes)
  }

  function onSetFilterBy(newFilterBy) {
    setFilterBy(newFilterBy)
    setSearchParams(newFilterBy)
  }

  function onPinNote(noteId) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)))

    noteService.getNote(noteId).then((note) => {
      if (note) {
        note.isPinned = !note.isPinned
        noteService.saveNote(note)
      }
    })
  }

  function onMoveToTrash(noteId) {
    noteService
      .moveToTrash(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg('Note moved to Trash')
      })
      .catch((err) => {
        console.log('Problem moving note to Trash', err)
        showErrorMsg('Problem moving note to Trash')
      })
  }

  function onMoveToArchive(noteId) {
    noteService
      .moveToArchive(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg('Note Archived')
      })
      .catch((err) => {
        console.log('Problem moving note to Archive', err)
        showErrorMsg('Problem moving note to Archive')
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
    showSuccessMsg('Note been edited')
  }

  function onChangeColor(noteId, color) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? { ...note, style: { backgroundColor: color } } : note)))

    noteService
      .getNote(noteId)
      .then((note) => {
        if (note) {
          if (!note.style) note.style = {}
          note.style.backgroundColor = color
          noteService.saveNote(note)
          showSuccessMsg('Color changed Successfully')
        }
      })
      .catch((err) => {
        console.log('Problem to change color', err)
        showErrorMsg('Problem to change color')
      })
  }
  function onDuplicateNote(note) {
    const duplicatedNote = noteService.duplicateNote(note)

    duplicatedNote.id = null

    noteService
      .saveNote(duplicatedNote)
      .then((newNote) => (duplicatedNote.id = newNote.id))
      .catch((err) => {
        console.log(err)
        setNotes((prevNotes) => prevNotes.filter((currNote) => currNote.id !== duplicatedNote.id))
      })
    setNotes((prevNotes) => [duplicatedNote, ...prevNotes])
    showSuccessMsg('Note Duplicated Successfully')
  }

  return (
    <div className="note-layout">
      <div className="note-side-bar">
        <NotesSidebar />
      </div>
      <div className="note-main">
        <section className="notes-container">
          <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <AddNote onAddNote={onAddNote} />
          <NoteList notes={notes} onMoveToTrash={onMoveToTrash} onEdit={onEdit} onChangeColor={onChangeColor} onPinNote={onPinNote} onMoveToArchive={onMoveToArchive} onDuplicateNote={onDuplicateNote} />
          {editingNote && <NoteEdit note={editingNote} onClose={onCloseEdit} onUpdateNote={onUpdateNote} />}
        </section>
      </div>
    </div>
  )
}
