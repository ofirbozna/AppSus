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
          const hasLabelMatch = note.info && note.info.label && regex.test(note.info.label)

          const hasTodoMatch =
            note.info &&
            note.info.todos &&
            note.info.todos.some(function (todo) {
              return regex.test(todo.txt)
            })

          return hasTitleMatch || hasLabelMatch || hasTodoMatch
        } else if (note.type === 'note-img') {
          return regex.test(note.title) || (note.info && note.info.title && regex.test(note.info.title))
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
    createdAt: createdAt,
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

function _createNote(txt, title, style, status, type) {
  if (!title) title = ''
  if (!style) style = {}
  if (!status) status = 'notes'
  if (!type) type = 'note-txt'

  const note = getDefaultNote()
  note.id = utilService.makeId()
  note.type = type

  if (type === 'note-txt') {
    note.info.txt = txt
  } else if (type === 'note-todos') {
    note.info = {
      label: title,
      todos: txt.split(',').map(function (item) {
        return { txt: item.trim(), doneAt: null }
      }),
    }
  } else if (type === 'note-img') {
    note.info = {
      title: title,
      img: txt,
    }
  }

  note.title = title
  note.style = style
  note.status = status
  return note
}

function _createTodoNote(title, todos, style, status) {
  if (!style) style = {}
  if (!status) status = 'notes'

  const note = getEmptyTodoNote()
  note.id = utilService.makeId()
  note.info.label = title
  note.info.todos = todos.map(function (txt) {
    return { txt: txt, doneAt: null }
  })
  note.title = title
  note.style = style
  note.status = status
  return note
}

function _createImageNote(title, imgUrl, style, status) {
  if (!style) style = {}
  if (!status) status = 'notes'

  const note = getEmptyImageNote()
  note.id = utilService.makeId()
  note.info.title = title
  note.info.img = imgUrl
  note.title = title
  note.style = style
  note.status = status
  return note
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      _createNote('I told my wife she should embrace her mistakes. She gave me a hug.', 'Marriage Advice'),
      _createNote('Adults are always asking children what they want to be when they grow up because theyre looking for ideas', 'Deep Thoughts'),
      _createTodoNote('Shopping List', ['Milk', 'Eggs', 'Bread', 'Coffee']),
      _createImageNote('Roberto Firmeno', 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcT3tuC6EWkh91DJKKHa6g06r7HX4JcbckHKyLYr-FWe0_HMhM_y-pBiAlFiLV6duuF1ms9KkYvhSoDHOj0'),
      _createNote('Some people graduate with honors, I am just honored to graduate.', 'School Struggles'),
      _createTodoNote('Home Tasks', ['Clean kitchen', 'Mow lawn', 'Fix doorbell']),
      _createNote('If you think nobody cares if youre alive, try missing a couple of payments.', 'Life Hack'),
      _createNote('Never let your best friends get lonely, keep disturbing them.', 'Advice'),
      _createNote('Friends buy you food. Best friends eat your food.', 'Truth'),
      _createNote('Im not arguing, Im just explaining why Im right.', 'Debate Club'),
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
