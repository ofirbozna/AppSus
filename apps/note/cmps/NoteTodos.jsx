import { noteService } from '../services/note.service.js'
const { useState, useEffect, useRef } = React

export function NoteTodos({ note }) {
  const [todos, setTodos] = useState(note.info.todos || [])
  const titleRef = useRef(null)

  useEffect(() => {
    setTodos(note.info.todos || [])
  }, [note])

  function changeContentTitle(ev) {
    if (note && titleRef.current) {
      note.info.title = titleRef.current.innerText
      noteService.saveNote(note)
    }
  }

  function toggleTodoStatus(index) {
    if (!todos || !Array.isArray(todos)) return

    const updatedTodos = [...todos]
    updatedTodos[index] = { ...updatedTodos[index], doneAt: updatedTodos[index].doneAt ? null : Date.now() }

    setTodos(updatedTodos)
    note.info.todos = updatedTodos
    noteService.saveNote(note)
  }

  function renderTodoItems() {
    if (!todos || !Array.isArray(todos)) return null

    return todos.map((todo, index) => {
      const isDone = todo.doneAt !== null

      return (
        <li key={index} className={isDone ? 'todo-done' : ''}>
          <div className="todo-item-container">
            <input type="checkbox" checked={isDone} onChange={() => toggleTodoStatus(index)} className="todo-checkbox" />
            <span className={isDone ? 'todo-text-done' : 'todo-text'}>{todo.txt}</span>
          </div>
        </li>
      )
    })
  }

  return (
    <section className="note-todos">
      <h3 ref={titleRef} onKeyDown={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>
        {(note.info && note.info.label) || (note.info && note.info.title) || ''}
      </h3>

      <ul className="todo-list">{renderTodoItems()}</ul>
    </section>
  )
}
