import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
const { useState } = React

export function AddNote({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('#ffffff1a')

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!text.trim()) return

    const newNote = noteService.getDefaultNote()
    newNote.title = title
    newNote.info.txt = text
    newNote.style = { backgroundColor: bgColor }

    noteService
      .saveNote(newNote)
      .then((savedNote) => {
        onAddNote(savedNote)
        setTitle('')
        setText('')
        setBgColor('#ffffff1a')
      })
      .catch((err) => console.log(err))
  }

  return (
    <section className="add-note" style={{ backgroundColor: bgColor }}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <textarea placeholder="Take a note..." value={text} onChange={(ev) => setText(ev.target.value)}></textarea>

        <ColorPicker selectedColor={bgColor} onColorSelect={setBgColor} />

        <button type="submit">Add Note</button>
      </form>
    </section>
  )
}
