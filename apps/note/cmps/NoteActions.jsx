export function NoteActions({ note, onRemoveNote, onEdit }) {
  return (
    <div className="note-actions">
      <button onClick={() => onRemoveNote(note.id)}>Delete</button>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button>Color</button>
      <button>Archive</button>
      <button>Dup</button>
      <button>Email</button>
    </div>
  )
}
