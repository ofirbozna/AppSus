import { NoteActions } from './NoteActions.jsx'
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onEdit, onChangeColor }) {
  const [bgColor, setBgColor] = useState(note.style && note.style.backgroundColor ? note.style.backgroundColor : '#ffffff')

  useEffect(() => {
    if (note.style && note.style.backgroundColor) {
      setBgColor(note.style.backgroundColor)
    } else {
      setBgColor('#ffffff1a')
    }
  }, [note.style && note.style.backgroundColor])

  return (
    <article className="note-preview" style={{ backgroundColor: bgColor }}>
      <h3>{note.title || 'Untitled'}</h3>
      <p
        onClick={() => {
          console.log('Clicked on note:', note)
          onEdit(note)
        }}
        style={{ cursor: 'pointer' }}
      >
        {note.info && note.info.txt}
      </p>
      <NoteActions note={note} onRemoveNote={onRemoveNote} onEdit={onEdit} onChangeColor={onChangeColor} />
    </article>
  )
}
