export function NotePreview({ note, onRemoveNote }) {
  return (
    <article className="note-preview">
      <h3>{note.title || 'Untitled'}</h3>
      <p>{note.info.txt}</p>
      <div className="note-actions">
        <button onClick={() => onRemoveNote(note.id)}>Delete</button>
        <button>Color</button>
        <button>Archive</button>
        <button>Dup</button>
        <button>Email</button>
      </div>
    </article>
  )
}
