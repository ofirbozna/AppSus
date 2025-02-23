import { NoteActions } from './NoteActions.jsx'

export function NotePreview({ note, onRemoveNote, onEdit }) {
  return (
    <article className="note-preview">
      <h3>{note.title || 'Untitled'}</h3>
      <p onClick={() => onEdit(note)} style={{ cursor: 'pointer' }}>
        {note.info.txt}
      </p>
      <NoteActions note={note} onRemoveNote={onRemoveNote} onEdit={onEdit} />
    </article>
  )
}
