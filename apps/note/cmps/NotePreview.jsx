export function NotePreview({ note, onRemoveNote }) {
  return (
    <article className="note-preview">
      <h3>{note.title || 'Untitled'}</h3>
      <p>{note.info.txt}</p>
      <button onClick={() => onRemoveNote(note.id)}>delete</button>
    </article>
  )
}
