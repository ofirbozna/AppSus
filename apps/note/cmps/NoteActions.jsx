import { ColorPicker } from './ColorPicker.jsx'

export function NoteActions({ note, onRemoveNote, onEdit, onChangeColor }) {
  return (
    <div className="note-actions">
      <button onClick={() => onRemoveNote(note.id)}>Delete</button>
      <button onClick={() => onEdit(note)}>Edit</button>

      <div className="color-picker-container">{note.style && <ColorPicker selectedColor={note.style.backgroundColor || '#ffffff1a'} onColorSelect={(color) => onChangeColor(note.id, color)} />}</div>

      <button>Archive</button>
      <button>Dup</button>
      <button>Email</button>
    </div>
  )
}
