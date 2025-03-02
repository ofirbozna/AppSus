import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onMoveToTrash, onMoveToArchive, onEdit, onChangeColor, onPinNote, onDuplicateNote }) {
  if (!notes || !notes.length) return <p>There is no notes...</p>

  const filteredNotes = notes.filter((note) => note.status === 'notes')

  // Separate pinned and unpinned notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned)
  const unPinnedNotes = filteredNotes.filter((note) => !note.isPinned)

  return (
    <section className="note-lists-container">
      {pinnedNotes.length > 0 && (
        <div className="note-lists-pin">
          <h6 className="list-title">Pinned</h6>
          <div className="note-list">
            {pinnedNotes.map((note) => (
              <NotePreview key={note.id} note={note} onMoveToTrash={onMoveToTrash} onMoveToArchive={onMoveToArchive} onEdit={onEdit} onChangeColor={onChangeColor} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} />
            ))}
          </div>
        </div>
      )}
      {unPinnedNotes.length > 0 && (
        <div className="note-lists-unpin">
          <h6 className="list-title">{pinnedNotes.length > 0 ? 'Others' : 'Notes'}</h6>
          <div className="note-list">
            {unPinnedNotes.map((note) => (
              <NotePreview key={note.id} note={note} onMoveToTrash={onMoveToTrash} onMoveToArchive={onMoveToArchive} onEdit={onEdit} onChangeColor={onChangeColor} onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
