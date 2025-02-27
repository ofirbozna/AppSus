import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, onMoveToTrash, onMoveToArchive, onEdit, onChangeColor, onPinNote }) {
  if (!notes || !notes.length) return <p>There is no notes...</p>

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unPinnedNotes = notes.filter((note) => !note.isPinned)

  return (
    <section className="note-lists-container">
      {pinnedNotes.length > 0 && (
        <div>
          <h6 className="list-title">Pinned</h6>
          <div className="note-list">
            {pinnedNotes.map((note) => (
              <NotePreview note={note} onMoveToTrash={onMoveToTrash} onMoveToArchive={onMoveToArchive} onEdit={onEdit} onChangeColor={onChangeColor} onPinNote={onPinNote} key={note.id} />
            ))}
          </div>
        </div>
      )}
      <h6 className="list-title">{pinnedNotes.length > 0 && 'Others'}</h6>
      <div className="note-list">
        {unPinnedNotes.map((note) => (
          <NotePreview note={note} onMoveToTrash={onMoveToTrash} onMoveToArchive={onMoveToArchive} onEdit={onEdit} onChangeColor={onChangeColor} onPinNote={onPinNote} key={note.id} />
        ))}
      </div>
    </section>
  )
}
