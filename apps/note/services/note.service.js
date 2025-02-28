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
}

function getNotes(filterBy = {}) {
  return storageService.query(NOTES_KEY).then((notes) => {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      notes = notes.filter((note) => regex.test(note.info.txt) || regex.test(note.title))
    }
    if (filterBy.status) {
      notes = notes.filter((note) => note.status === filterBy.status)
    }
    if (filterBy.type) {
      notes = notes.filter((note) => note.type === filterBy.type)
    }
    if (filterBy.color) {
      notes = notes.filter((note) => note.style && note.style.backgroundColor === filterBy.color)
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
function getDefaultNote(createdAt = '111223') {
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
function duplicateNote(note) {
  const newNote = structuredClone(note)
  newNote.id = utilService.makeId()
  return newNote
}

function _createNote(txt, title = '', style = {}, status = 'notes') {
  const note = getDefaultNote()
  note.id = utilService.makeId()
  note.info.txt = txt
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
      _createNote('Adults are always asking children what they want to be when they grow up because they’re looking for ideas', 'Deep Thoughts'),
      _createNote('Some people graduate with honors, I am just honored to graduate.', 'School Struggles'),
      _createNote('If you think nobody cares if you’re alive, try missing a couple of payments.', 'Life Hack'),
      _createNote('Never let your best friends get lonely, keep disturbing them.', 'Advice'),
      _createNote('Friends buy you food. Best friends eat your food.', 'Truth'),
      _createNote('I’m not arguing, I’m just explaining why I’m right.', 'Debate Club'),
    ]
    utilService.saveToStorage(NOTES_KEY, notes)
  }
}
function createdAtNote() {
  return new Date().toISOString().split('T')[0]
}

function moveToTrash(noteId) {
  return getNote(noteId).then((note) => {
    note.status = 'trash'
    return saveNote(note)
  })
}

function moveToArchive(noteId) {
  return getNote(noteId).then((note) => {
    note.status = 'archive'
    return saveNote(note)
  })
}

function restoreNote(noteId) {
  return getNote(noteId).then((note) => {
    note.status = 'notes'
    return saveNote(note)
  })
}
