import { NoteActions } from './NoteActions.jsx'
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onEdit, onChangeColor }) {
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
      <h3>{note.title || 'Untitled'}</h3>
      <p onClick={() => onEdit(note)} style={{ cursor: 'pointer' }}>
        {note.info && note.info.txt}
      </p>

      <div className="note-actions-wrapper">
        <NoteActions note={note} onRemoveNote={onRemoveNote} onEdit={onEdit} onChangeColor={onChangeColor} />
      </div>
    </article>
  )
}
