import { noteService } from '../services/note.service.js'
const { useState } = React

export function AddNote({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!text.trim()) return

    const newNote = noteService.getDefaultNote()
    newNote.title = title
    newNote.info.txt = text

    noteService
      .saveNote(newNote)
      .then((savedNote) => {
        onAddNote(savedNote)
        setTitle('')
        setText('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className="add-note">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        <textarea placeholder="Take a note..." value={text} onChange={(ev) => setText(ev.target.value)}></textarea>
        <button type="submit">Add Note</button>
      </form>
    </section>
  )
}

//TODO: ADD success message
//TODO: ADD other options exp for txt
//TODO:
