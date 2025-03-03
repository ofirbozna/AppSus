import { ColorPicker } from './ColorPicker.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteEdit({ note, onClose, onUpdateNote }) {
  const [editedNote, setEditedNote] = useState({ ...note })
  const [bgColor, setBgColor] = useState(
    note.style && note.style.backgroundColor
      ? note.style.backgroundColor
      : '#ffffff'
  )
  const [todoItems, setTodoItems] = useState(
    note.type === 'note-todos' && note.info.todos ? [...note.info.todos] : []
  )

  function handleChange(ev) {
    const { name, value } = ev.target
    setEditedNote(function (prevNote) {
      return {
        ...prevNote,
        info: prevNote.info
          ? { ...prevNote.info, [name]: value }
          : { [name]: value },
      }
    })
  }

  function handleTodoChange(index, value) {
    if (editedNote.type !== 'note-todos') return

    const updatedTodos = [...todoItems]
    updatedTodos[index] = { ...updatedTodos[index], txt: value }

    // If editing the last item and it's not empty, add a new empty item
    if (index === updatedTodos.length - 1 && value.trim()) {
      updatedTodos.push({ txt: '', doneAt: null })
    }

    setTodoItems(updatedTodos)
    setEditedNote(function (prevNote) {
      return {
        ...prevNote,
        info: { ...(prevNote.info || {}), todos: updatedTodos },
      }
    })
  }

  function toggleTodoStatus(index) {
    const updatedTodos = [...todoItems]
    updatedTodos[index].doneAt = updatedTodos[index].doneAt ? null : Date.now()

    setTodoItems(updatedTodos)
    setEditedNote(function (prevNote) {
      return {
        ...prevNote,
        info: { ...(prevNote.info || {}), todos: updatedTodos },
      }
    })
  }

  function handleImageUpload(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = function () {
      setEditedNote(function (prevNote) {
        return {
          ...prevNote,
          info: { ...(prevNote.info || {}), img: reader.result },
        }
      })
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    const updatedNote = { ...editedNote, style: { backgroundColor: bgColor } }

    console.log('Saving updated note:', updatedNote)

    noteService
      .saveNote(updatedNote)
      .then(function (savedNote) {
        console.log('Note saved successfully:', savedNote)
        onUpdateNote(savedNote)
        onClose()
      })
      .catch(function (err) {
        console.log('Error saving note:', err)
      })
  }

  function handleContainerClick(ev) {
    ev.stopPropagation()
  }

  function removeTodoItem(index) {
    if (todoItems.length <= 1) return

    const updatedTodos = todoItems.filter(function (_, i) {
      return i !== index
    })
    setTodoItems(updatedTodos)
    setEditedNote(function (prevNote) {
      return {
        ...prevNote,
        info: { ...(prevNote.info || {}), todos: updatedTodos },
      }
    })
  }

  // Helper function to safely get a value from info
  function getInfoValue(key, defaultValue) {
    if (editedNote.info && editedNote.info[key] !== undefined) {
      return editedNote.info[key]
    }
    return defaultValue || ''
  }

  return (
    <section
      className="note-edit-modal open"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
    >
      <div
        className="modal-container"
        style={{ backgroundColor: bgColor }}
        onClick={handleContainerClick}
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={(ev) => {
            ev.preventDefault()
            handleSave()
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={editedNote.title || ''}
            onChange={(ev) =>
              setEditedNote({ ...editedNote, title: ev.target.value })
            }
            style={{ backgroundColor: bgColor }}
            className="rtl-text"
          />

          {/* Text note textarea */}
          {editedNote.type === 'note-txt' && (
            <textarea
              name="txt"
              placeholder="Edit note..."
              value={getInfoValue('txt', '')}
              onChange={handleChange}
              style={{ backgroundColor: bgColor }}
              className="rtl-text"
            />
          )}

          {/* Image edit section */}
          {editedNote.type === 'note-img' && (
            <div className="image-edit" style={{ backgroundColor: bgColor }}>
              <input
                type="text"
                name="title"
                placeholder="Image title"
                value={getInfoValue('title', '')}
                onChange={handleChange}
                style={{ backgroundColor: bgColor, marginBottom: '10px' }}
                className="rtl-text"
              />
              {editedNote.info && editedNote.info.img && (
                <img
                  src={editedNote.info.img}
                  alt={getInfoValue('title', 'Note image')}
                  style={{ maxWidth: '100%', marginBottom: '10px' }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginBottom: '10px' }}
              />
            </div>
          )}

          {/* Todos edit section */}
          {editedNote.type === 'note-todos' && (
            <div className="todos-edit" style={{ backgroundColor: bgColor }}>
              <input
                type="text"
                name="label"
                placeholder="List title"
                value={getInfoValue('label', '')}
                onChange={handleChange}
                style={{ backgroundColor: bgColor, marginBottom: '10px' }}
                className="rtl-text"
              />
              <div className="todo-items">
                {todoItems.map(function (todo, index) {
                  const isDone = todo.doneAt !== null

                  return (
                    <div
                      key={index}
                      className="todo-item"
                      style={{ display: 'flex', marginBottom: '5px' }}
                    >
                      <div className="todo-checkbox-container">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTodoStatus(index)}
                          className="todo-checkbox"
                        />
                      </div>
                      <input
                        type="text"
                        value={todo.txt || ''}
                        onChange={function (e) {
                          handleTodoChange(index, e.target.value)
                        }}
                        placeholder={'Todo item ' + (index + 1)}
                        style={{
                          flex: 1,
                          backgroundColor: bgColor,
                          textDecoration: isDone ? 'line-through' : 'none',
                          color: isDone ? '#80868b' : 'inherit',
                        }}
                        className="todo-input"
                      />
                      {todoItems.length > 1 && (
                        <button
                          type="button"
                          onClick={function () {
                            removeTodoItem(index)
                          }}
                          style={{ marginLeft: '5px' }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <ColorPicker selectedColor={bgColor} onColorSelect={setBgColor} />
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
                onClose()
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
