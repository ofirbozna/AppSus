import { NoteActions } from './NoteActions.jsx'
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onEdit, onChangeColor, onPinNote, onMoveToTrash, onMoveToArchive }) {
  const [bgColor, setBgColor] = useState(note.style && note.style.backgroundColor ? note.style.backgroundColor : '#ffffff')

  useEffect(() => {
    if (note.style && note.style.backgroundColor) {
      setBgColor(note.style.backgroundColor)
    } else {
      setBgColor('#ffffff')
    }
  }, [note.style && note.style.backgroundColor])

  return (
    <article className="note-preview" style={{ backgroundColor: bgColor }}>
      <button onClick={() => onPinNote(note.id)} className={`pin-btn ${note.isPinned ? 'pinned' : ''}`}>
        <i className={`fas ${note.isPinned ? 'fa-thumbtack' : 'fa-thumbtack fa-regular'}`}></i>
      </button>
      <h3>{note.title || 'Untitled'}</h3>
      <p onClick={() => onEdit(note)} style={{ cursor: 'pointer' }}>
        {note.info && note.info.txt}
      </p>

      <div className="note-actions-wrapper">
        <NoteActions note={note} onRemoveNote={onRemoveNote} onEdit={onEdit} onChangeColor={onChangeColor} onMoveToTrash={onMoveToTrash} onMoveToArchive={onMoveToArchive} />
      </div>
    </article>
  )
}
