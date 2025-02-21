import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
  if (!notes || !notes.length) return <p>Loading notes...</p>

  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unPinnedNotes = notes.filter((note) => !note.isPinned)

  return (
    <section className="note-lists-container">
      {pinnedNotes.length > 0 && (
        <Fragment>
          <h6 className="list-title">Pinned</h6>
          <div className="note-list">
            {pinnedNotes.map((note) => {
              return <NotePreview note={note} onRemoveNote={onRemoveNote} key={note.id} />
            })}
          </div>
        </Fragment>
      )}
      <h6 className="list-title">{pinnedNotes.length > 0 && 'Others'}</h6>
      <div className="note-list">
        {unPinnedNotes.map((note) => {
          return <NotePreview note={note} onRemoveNote={onRemoveNote} key={note.id} />
        })}
      </div>
    </section>
  )
}
