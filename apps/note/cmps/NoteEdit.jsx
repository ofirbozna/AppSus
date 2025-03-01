import { ColorPicker } from './ColorPicker.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteEdit({ note, onClose, onUpdateNote }) {
  const [editedNote, setEditedNote] = useState({ ...note })
  const [bgColor, setBgColor] = useState(note.style && note.style.backgroundColor ? note.style.backgroundColor : '#ffffff')

  function handleChange(ev) {
    const { name, value } = ev.target
    setEditedNote((prevNote) => ({
      ...prevNote,
      info: prevNote.info ? { ...prevNote.info, [name]: value } : { [name]: value },
    }))
  }

  function handleSave() {
    const updatedNote = { ...editedNote, style: { backgroundColor: bgColor } }

    console.log('Saving updated note:', updatedNote)

    noteService
      .saveNote(updatedNote)
      .then((savedNote) => {
        console.log('Note saved successfully:', savedNote)
        onUpdateNote(savedNote)
        onClose()
      })
      .catch((err) => console.log('Error saving note:', err))
  }

  function handleContainerClick(ev) {
    ev.stopPropagation()
  }

  return (
    <section
      className="note-edit-modal open"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div className="modal-container" style={{ backgroundColor: bgColor }} onClick={handleContainerClick}>
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={(ev) => {
            ev.preventDefault()
            handleSave()
          }}
        >
          <input type="text" placeholder="Title" value={editedNote.title} onChange={(ev) => setEditedNote({ ...editedNote, title: ev.target.value })} style={{ backgroundColor: bgColor }} />

          <textarea name="txt" placeholder="Edit note..." value={editedNote.info && editedNote.info.txt} onChange={handleChange} style={{ backgroundColor: bgColor }} />

          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <ColorPicker selectedColor={bgColor} onColorSelect={setBgColor} />
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
                onClose()
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
