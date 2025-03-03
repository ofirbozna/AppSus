import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
const { useState, useRef, useEffect } = React

export function AddNote({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [isExpanded, setIsExpanded] = useState(false)
  const [noteType, setNoteType] = useState('note-txt')
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [todoItems, setTodoItems] = useState([''])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(Date.now()) // Add a key to force re-render

  const noteRef = useRef(null)
  const fileInputRef = useRef(null)
  const colorPickerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsExpanded(false)
        setShowColorPicker(false)
      }

      // Close color picker when clicking outside of it
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target) &&
        !event.target.closest('.icon-button.color-btn')
      ) {
        setShowColorPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleSubmit(ev) {
    if (ev) ev.preventDefault()

    // Validate based on note type
    if (noteType === 'note-txt' && !text.trim()) return
    if (noteType === 'note-img' && !imageUrl) return
    if (noteType === 'note-video' && !videoUrl) return

    const filteredTodoItems = todoItems.filter((item) => item.trim())
    if (noteType === 'note-todos' && filteredTodoItems.length === 0) return

    const newNote = noteService.getDefaultNote()
    newNote.title = title
    newNote.type = noteType
    newNote.style = { backgroundColor: bgColor }

    // Set note content based on type
    if (noteType === 'note-txt') {
      newNote.info.txt = text
    } else if (noteType === 'note-img') {
      newNote.info.title = title || 'Image Note'
      newNote.info.img = imageUrl
    } else if (noteType === 'note-video') {
      newNote.info.title = title || 'Video Note'
      newNote.info.url = videoUrl
      newNote.info.txt = text || ''
    } else if (noteType === 'note-todos') {
      newNote.info.label = title || 'Todo List'
      newNote.info.todos = filteredTodoItems.map((txt) => ({
        txt,
        doneAt: null,
      }))
    }

    noteService
      .saveNote(newNote)
      .then((savedNote) => {
        onAddNote(savedNote)
        resetForm()
      })
      .catch((err) => console.log(err))
  }

  function resetForm() {
    setTitle('')
    setText('')
    setBgColor('#ffffff')
    setIsExpanded(false)
    setImageUrl('')
    setVideoUrl('')
    setTodoItems([''])
    setFile(null)
    setNoteType('note-txt')
    setShowColorPicker(false)
    // Generate a new key for the file input to force a complete refresh
    setFileInputKey(Date.now())
  }

  function handleImageChange(ev) {
    const file = ev.target.files[0]
    if (file) {
      // Clear the image state before setting a new one
      setImageUrl('')

      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
        setNoteType('note-img')
        setIsExpanded(true)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleTodoItemChange(index, value) {
    const newItems = [...todoItems]
    newItems[index] = value

    // Add a new empty field if we're at the last item and it's not empty
    if (index === todoItems.length - 1 && value.trim()) {
      newItems.push('')
    }

    setTodoItems(newItems)
  }

  function removeTodoItem(index) {
    if (todoItems.length > 1) {
      setTodoItems(todoItems.filter((_, i) => i !== index))
    }
  }

  function switchToTodoMode() {
    setNoteType('note-todos')
    setIsExpanded(true)
  }

  function switchToImageMode() {
    // Generate a new key for the file input to force a complete refresh
    setFileInputKey(Date.now())
    // After a small delay to ensure the input is refreshed
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }, 10)
  }

  function switchToVideoMode() {
    setNoteType('note-video')
    setIsExpanded(true)
  }

  function RenderNoteAddContent() {
    if (noteType === 'note-txt') {
      return (
        <textarea
          placeholder="Take a note..."
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        />
      )
    } else if (noteType === 'note-img') {
      {
        /*Image */
      }
      return (
        <div className="image-content">
          {/* <textarea placeholder="Add a caption..." value={text} onChange={(ev) => setText(ev.target.value)} /> */}
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Note" />
            </div>
          )}
        </div>
      )
      {
        /*Video */
      }
    } else if (noteType === 'note-video') {
      return (
        <div className="video-content">
          <input
            type="text"
            placeholder="Enter YouTube video URL..."
            value={videoUrl}
            onChange={(ev) => setVideoUrl(ev.target.value)}
            className="video-url-input"
          />
          <textarea
            placeholder="Add notes about this video..."
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
        </div>
      )
      {
        /*Todo list */
      }
    } else if (noteType === 'note-todos') {
      return (
        <div className="todo-items">
          {todoItems.map((item, index) => (
            <div key={index} className="todo-item">
              <input type="checkbox" className="todo-checkbox" />
              <input
                type="text"
                placeholder={`Item ${index + 1}`}
                value={item}
                onChange={(e) => handleTodoItemChange(index, e.target.value)}
                className="todo-input"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTodoItem(index)}
                  className="remove-item-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <section
      ref={noteRef}
      className={`add-note ${isExpanded ? 'expanded' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <form onSubmit={handleSubmit}>
        {!isExpanded ? (
          <div className="note-collapsed" onClick={() => setIsExpanded(true)}>
            <span className="note-placeholder">Take a note...</span>
            <div className="note-icons">
              {/*Todo list */}
              <button
                type="button"
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                  switchToTodoMode()
                }}
              >
                <i className="far fa-check-square"></i>
              </button>

              {/*Image */}
              <button
                type="button"
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                  switchToImageMode()
                }}
              >
                <i className="fas fa-image"></i>
              </button>

              {/*Video */}
              <button
                type="button"
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                  switchToVideoMode()
                }}
              >
                <i className="fa-solid fa-video"></i>
              </button>

              {/*Draw will add later */}
              <button type="button" className="icon-button">
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="note-add-expanded">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            {RenderNoteAddContent()}

            <div className="note-add-expanded-footer">
              <div className="note-toolbar">
                <button type="button" className="icon-button">
                  <i className="fas fa-bell"></i>
                </button>
                <button type="button" className="icon-button">
                  <i className="fas fa-user-plus"></i>
                </button>
                <div
                  className="icon-button color-btn "
                  onClick={(e) => e.stopPropagation()}
                >
                  <ColorPicker
                    selectedColor={bgColor}
                    onColorSelect={setBgColor}
                  />
                </div>
                <button
                  type="button"
                  className="icon-button"
                  onClick={switchToImageMode}
                >
                  <i className="fas fa-image"></i>
                </button>
                <button type="button" className="icon-button">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={() => {
                  const hasContent =
                    (noteType === 'note-txt' && text.trim()) ||
                    (noteType === 'note-img' && imageUrl) ||
                    (noteType === 'note-video' && videoUrl) ||
                    (noteType === 'note-todos' &&
                      todoItems.some((item) => item.trim()))

                  if (hasContent) {
                    handleSubmit()
                  } else {
                    resetForm()
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Use a key to re-render of the file input element */}
      <input
        key={fileInputKey}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </section>
  )
}
