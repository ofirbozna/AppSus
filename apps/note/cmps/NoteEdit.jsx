import { noteService } from '../services/note.service.js'
import { NoteActions } from './NoteActions.jsx'
const { useState } = React

export function NoteEdit({ note, onClose, onUpdateNote, onRemoveNote }) {
  const [editedNote, setEditedNote] = useState({ ...note })

  function handleChange(ev) {
    const { name, value } = ev.target
    setEditedNote((prevNote) => ({
      ...prevNote,
      info: { ...prevNote.info, [name]: value },
    }))
  }

  function handleSave() {
    noteService
      .saveNote(editedNote)
      .then((updatedNote) => {
        onUpdateNote(updatedNote)
        onClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleOverlayClick(ev) {
    if (ev.currentTarget === ev.target) {
      onClose()
    }
  }

  return (
    <div className={`note-edit-modal open`} onClick={handleOverlayClick}>
      <div className="modal-container">
        <input type="text" value={editedNote.title} onChange={(ev) => setEditedNote({ ...editedNote, title: ev.target.value })} placeholder="Title" />
        <textarea name="txt" value={editedNote.info.txt} onChange={handleChange} placeholder="Edit note..." />

        <NoteActions note={editedNote} onRemoveNote={onRemoveNote} onEdit={() => {}} />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

//TODO: ADD success message
//TODO: ADD other options exp for txt
