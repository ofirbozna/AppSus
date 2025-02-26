import { ColorPicker } from './ColorPicker.jsx'

export function NoteActions({ note, onRemoveNote, onEdit, onChangeColor }) {
  return (
    <div className="note-actions">
      <button
        title="Delete"
        onClick={(e) => {
          e.stopPropagation()
          onRemoveNote(note.id)
        }}
      >
        <i className="fas fa-trash"></i>
      </button>

      <button
        title="Edit"
        onClick={(e) => {
          e.stopPropagation()
          onEdit(note)
        }}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div onClick={(e) => e.stopPropagation()}>
        <ColorPicker note={note} onChangeColor={onChangeColor} />
      </div>

      <button title="Archive" onClick={(e) => e.stopPropagation()}>
        <i className="fas fa-archive"></i>
      </button>

      <button title="Duplicate" onClick={(e) => e.stopPropagation()}>
        <i className="fas fa-copy"></i>
      </button>

      <button title="Email" onClick={(e) => e.stopPropagation()}>
        <i className="fas fa-envelope"></i>
      </button>
    </div>
  )
}
