import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
const { useState, useRef, useEffect } = React

export function AddNote({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [isExpanded, setIsExpanded] = useState(false)

  const noteRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
        setBgColor('#ffffff')
        setIsExpanded(false) // Collapse after adding
      })
      .catch((err) => console.log(err))
  }

  return (
    <section ref={noteRef} className={`add-note ${isExpanded ? 'expanded' : ''}`} style={{ backgroundColor: bgColor }}>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Take a note..." value={text} onFocus={() => setIsExpanded(true)} onChange={(ev) => setText(ev.target.value)} />

        {isExpanded && (
          <React.Fragment>
            <input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <ColorPicker selectedColor={bgColor} onColorSelect={setBgColor} />
            <button type="submit">Add Note</button>
          </React.Fragment>
        )}
      </form>
    </section>
  )
}
