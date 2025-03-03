// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
  getNotes,
  getNote,
  saveNote,
  deleteNote,
  getDefaultFilter,
  getDefaultNote,
  getDefaultSearchParams,
  moveToTrash,
  moveToArchive,
  restoreNote,
  duplicateNote,
  getEmptyTodoNote,
  getEmptyImageNote,
}

function getNotes(filterBy) {
  if (!filterBy) filterBy = {}

  return storageService.query(NOTES_KEY).then(function (notes) {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      notes = notes.filter(function (note) {
        // Check different properties based on note type
        if (note.type === 'note-txt') {
          return regex.test(note.info.txt) || regex.test(note.title)
        } else if (note.type === 'note-todos') {
          const hasTitleMatch = regex.test(note.title)
          const hasLabelMatch =
            note.info && note.info.label && regex.test(note.info.label)

          const hasTodoMatch =
            note.info &&
            note.info.todos &&
            note.info.todos.some(function (todo) {
              return regex.test(todo.txt)
            })

          return hasTitleMatch || hasLabelMatch || hasTodoMatch
        } else if (note.type === 'note-img') {
          return (
            regex.test(note.title) ||
            (note.info && note.info.title && regex.test(note.info.title))
          )
        }
        return regex.test(note.title)
      })
    }
    if (filterBy.status) {
      notes = notes.filter(function (note) {
        return note.status === filterBy.status
      })
    }
    if (filterBy.type) {
      notes = notes.filter(function (note) {
        return note.type === filterBy.type
      })
    }
    if (filterBy.color) {
      notes = notes.filter(function (note) {
        return note.style && note.style.backgroundColor === filterBy.color
      })
    }
    return notes
  })
}

function getNote(id) {
  return storageService.get(NOTES_KEY, id)
}

function saveNote(note) {
  const noteToSave = structuredClone(note)
  if (noteToSave.id) {
    console.log('PUTTING')
    return storageService.put(NOTES_KEY, noteToSave)
  } else {
    console.log('POSTING')
    return storageService.post(NOTES_KEY, noteToSave)
  }
}

function deleteNote(id) {
  return storageService.remove(NOTES_KEY, id)
}

function getDefaultFilterParams() {
  return { txt: '', title: '', status: 'notes', color: '', label: '', type: '' }
}

function getDefaultFilter() {
  return { txt: '', title: '', color: '', label: '', type: '' }
}

function getDefaultSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field]
  }
  return filterBy
}

function getDefaultNote(createdAt) {
  if (!createdAt) createdAt = Date.now()

  return {
    id: null,
    title: '',
    createdAt,
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: '',
    },
    src: '',
    style: {},
    status: 'notes',
  }
}

function getEmptyTodoNote(createdAt) {
  if (!createdAt) createdAt = Date.now()

  return {
    id: null,
    title: '',
    createdAt: createdAt,
    type: 'note-todos',
    isPinned: false,
    info: {
      label: '',
      todos: [{ txt: '', doneAt: null }],
    },
    style: {},
    status: 'notes',
  }
}

function getEmptyImageNote(createdAt) {
  if (!createdAt) createdAt = Date.now()

  return {
    id: null,
    title: '',
    createdAt: createdAt,
    type: 'note-img',
    isPinned: false,
    info: {
      title: '',
      img: '',
    },
    style: {},
    status: 'notes',
  }
}

function duplicateNote(note) {
  const newNote = structuredClone(note)
  newNote.id = utilService.makeId()
  return newNote
}

function _createNote({
  title = '',
  content = '',
  description = '',
  type = 'note-txt',
  style = {},
  status = 'notes',
}) {
  const note = {
    id: utilService.makeId(),
    title,
    createdAt: Date.now(),
    type,
    isPinned: false,
    style,
    status,
    info: {},
  }

  if (type === 'note-txt') {
    note.info.txt = content
  } else if (type === 'note-todos') {
    note.info.label = title
    note.info.todos = content
      .split(',')
      .map((txt) => ({ txt: txt.trim(), doneAt: null }))
  } else if (type === 'note-img') {
    note.info.title = title
    note.info.img = content
  } else if (type === 'note-video') {
    note.info.title = title
    note.info.url = content
    note.info.txt = description
  }

  return note
}
// function _createTodoNote(title, todos, style, status) {
//   if (!style) style = {}
//   if (!status) status = 'notes'

//   const note = getEmptyTodoNote()
//   note.id = utilService.makeId()
//   note.info.label = title
//   note.info.todos = todos.map((txt) => {
//     return { txt: txt, doneAt: null }
//   })
//   note.title = title
//   note.style = style
//   note.status = status
//   return note
// }

// function _createImageNote(title, imgUrl, style, status) {
//   if (!style) style = {}
//   if (!status) status = 'notes'

//   const note = getEmptyImageNote()
//   note.id = utilService.makeId()
//   note.info.title = title
//   note.info.img = imgUrl
//   note.title = title
//   note.style = style
//   note.status = status
//   return note
// }

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      _createNote({
        title: 'Marriage Advice',
        content:
          'I told my wife she should embrace her mistakes. She gave me a hug.',
        status: 'trash',
      }),
      _createNote({
        title: 'Deep Thoughts',
        content:
          'Adults are always asking children what they want to be when they grow up because theyre looking for ideas',
        status: 'archive',
      }),
      _createNote({
        title: 'Shopping List',
        content: 'Milk,Eggs,Bread,Coffee',
        type: 'note-todos',
      }),
      _createNote({
        title: 'Need to do',
        content: 'Add draw note,Add audio note,Add map note',
        type: 'note-todos',
      }),
      _createNote({
        title: 'Fede Valverde',
        content:
          'https://cdn.vox-cdn.com/thumbor/xnYOPeoJQevlZUfH9k26Ay-m-xk=/0x0:4500x3000/1820x1213/filters:focal(1890x1140:2610x1860):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/73932043/2201037656.0.jpg',
        type: 'note-img',
      }),
      _createNote({
        title: ' The debate',
        content: 'https://www.youtube.com/watch?v=u48q8xYOCDY&t=10s',
        description: 'Ronaldo is the 🐐',
        type: 'note-video',
      }),
      _createNote({
        title: 'School Struggles',
        content:
          'Some people graduate with honors, I am just honored to graduate.',
      }),
      _createNote({
        title: 'Home Tasks',
        content: 'Clean kitchen,Mow lawn,Fix doorbell',
        type: 'note-todos',
      }),
      _createNote({
        title: 'Life Hack',
        content:
          'If you think nobody cares if youre alive, try missing a couple of payments.',
      }),
      _createNote({
        title: 'Advice',
        content:
          'Never let your best friends get lonely, keep disturbing them.',
      }),
      _createNote({
        title: 'Truth',
        content: 'Friends buy you food. Best friends eat your food.',
      }),
      _createNote({
        title: 'Debate Club',
        content: 'Im not arguing, Im just explaining why Im right.',
      }),
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
}

function createdAtNote() {
  return new Date().toISOString().split('T')[0]
}

function moveToTrash(noteId) {
  return getNote(noteId).then(function (note) {
    note.status = 'trash'
    return saveNote(note)
  })
}

function moveToArchive(noteId) {
  return getNote(noteId).then(function (note) {
    note.status = 'archive'
    return saveNote(note)
  })
}

function restoreNote(noteId) {
  return getNote(noteId).then(function (note) {
    note.status = 'notes'
    return saveNote(note)
  })
}
