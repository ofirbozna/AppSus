import { NoteActions } from './NoteActions.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
const { useState, useEffect } = React

export function NotePreview({
  note,
  onRemoveNote,
  onEdit,
  onChangeColor,
  onPinNote,
  onMoveToTrash,
  onMoveToArchive,
  onDuplicateNote,
}) {
  const [bgColor, setBgColor] = useState(
    note.style && note.style.backgroundColor
      ? note.style.backgroundColor
      : '#ffffff'
  )

  useEffect(() => {
    if (note.style && note.style.backgroundColor) {
      setBgColor(note.style.backgroundColor)
    } else {
      setBgColor('#ffffff')
    }
  }, [note.style && note.style.backgroundColor])

  function renderNoteContent() {
    if (note.type === 'note-video') {
      return <NoteVideo note={note} />
    } else if (note.type === 'note-img') {
      return <NoteImg note={note} />
    } else if (note.type === 'note-todos') {
      return <NoteTodos note={note} />
    } else {
      // Default text note
      return (
        <div>
          <h3>{note.title || 'Untitled'}</h3>
          <p onClick={() => onEdit(note)} style={{ cursor: 'pointer' }}>
            {note.info && note.info.txt}
          </p>
        </div>
      )
    }
  }

  return (
    <article className="note-preview" style={{ backgroundColor: bgColor }}>
      <button
        onClick={() => onPinNote(note.id)}
        className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}
      >
        <i
          className={`fas ${
            note.isPinned ? 'fa-thumbtack' : 'fa-thumbtack fa-regular'
          }`}
        ></i>
      </button>

      {renderNoteContent()}

      <div className="note-actions-wrapper">
        <NoteActions
          note={note}
          onRemoveNote={onRemoveNote}
          onEdit={onEdit}
          onChangeColor={onChangeColor}
          onMoveToTrash={onMoveToTrash}
          onMoveToArchive={onMoveToArchive}
          onDuplicateNote={onDuplicateNote}
          showEdit={note.type === 'note-txt' || note.type === 'note-todos'}
          showSendToMail={note.type === 'note-txt'}
        />
      </div>
    </article>
  )
}
