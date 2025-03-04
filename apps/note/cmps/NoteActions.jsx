import { ColorPicker } from './ColorPicker.jsx'
import { NoteToMail } from './NoteToEmail.jsx'

export function NoteActions({
  note,
  onMoveToTrash,
  onMoveToArchive,
  onEdit,
  onChangeColor,
  onDuplicateNote,
  showEdit,
}) {
  return (
    <div className="note-actions">
      <button
        title="Move to Trash"
        onClick={(e) => {
          e.stopPropagation()
          onMoveToTrash(note.id)
        }}
      >
        <i className="fas fa-trash"></i>
      </button>

      <button
        title="Archive"
        onClick={(e) => {
          e.stopPropagation()
          onMoveToArchive(note.id)
        }}
      >
        <i className="fas fa-archive"></i>
      </button>

      {showEdit && (
        <button
          title="Edit"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(note)
          }}
        >
          <i className="fas fa-edit"></i>
        </button>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <ColorPicker note={note} onChangeColor={onChangeColor} />
      </div>

      <button
        title="Duplicate"
        onClick={(e) => {
          e.stopPropagation()
          onDuplicateNote(note)
        }}
      >
        <i className="fas fa-copy"></i>
      </button>
      <div onClick={(e) => e.stopPropagation()}>
        <NoteToMail note={note} />
      </div>
    </div>
  )
}
