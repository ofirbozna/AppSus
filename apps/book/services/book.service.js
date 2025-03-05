import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

import { books } from './books.js'

const BOOKS_KEY = 'booksDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}
let gBooks = []
_createBooks()

export const bookService = {
  get,
  remove,
  save,
  query,
  getDefaultFilter,
  getEmptyBook,
  getGoogleBooks,
  addGoogleBook,
  getDefaultSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(BOOKS_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService
    .get(BOOKS_KEY, bookId)
    .then((book) => _setNextPrevBookId(book))
}
function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function getEmptyBook(title = '', price = 0, description = '') {
  const randomImgNumber = Math.floor(Math.random() * 19) + 1
  const randomImgPath = `../../../assets/imgs/${randomImgNumber}.jpg`

  return {
    title,
    subtitle: '',
    authors: '',
    categories: '',
    listPrice: {
      amount: price,
      currencyCode: 'USD',
      isOnSale: false,
    },
    publishedDate: '',
    thumbnail: randomImgPath,
    description,
    pageCount: '',
    language: 'en',
  }
}

function getDefaultFilter() {
  return { title: '', minPrice: '' }
}
function getDefaultSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field]
  }
  return filterBy
}
// function getDefaultSearchParams(searchParams) {
//   const title = searchParams.get('title') || ''
//   const minPrice = searchParams.get('minPrice') || ''
//   return { title, minPrice }
// }

function _createBooks() {
  storageService.query(BOOKS_KEY).then((storedBooks) => {
    if (!storedBooks || !storedBooks.length) {
      gBooks = [...books]
      utilService.saveToStorage(BOOKS_KEY, gBooks)
    } else {
      gBooks = storedBooks
    }
  })
}

function addGoogleBook(book) {
  return storageService.query(BOOKS_KEY).then((books) => {
    const bookExists = books.some((b) => b.id === book.id)
    if (bookExists) {
      return Promise.reject('This book is already in your collection!')
    }

    return storageService.post(BOOKS_KEY, book, false)
  })
}

function getGoogleBooks(bookName) {
  if (bookName === '') return Promise.resolve()
  const googleBooks = gCache[bookName]
  if (googleBooks) {
    console.log('data from storage...', googleBooks)
    return Promise.resolve(googleBooks)
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
  return axios.get(url).then((res) => {
    const data = res.data.items
    console.log('data from network...', data)
    const books = _formatGoogleBooks(data)
    console.log('books', books)

    gCache[bookName] = books
    utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
    return books
  })
}

function _formatGoogleBooks(googleBooks) {
  return googleBooks.map((googleBook) => {
    const { volumeInfo } = googleBook
    console.log('volumeInfo', volumeInfo)

    const book = {
      id: googleBook.id,
      title: volumeInfo.title,
      description: volumeInfo.description
        ? volumeInfo.description
        : utilService.makeLorem(),
      pageCount: volumeInfo.pageCount,
      authors: volumeInfo.authors,
      categories: volumeInfo.categories,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
      reviews: [],
    }
    if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
    return book
  })
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOKS_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

// function _createBooks() {
//   let books = utilService.loadFromStorage('BOOKS_KEY')
//   if (!books || !books.length) {
//     books = []
//     books.push(_createBook())
//     books.push(_createBook())
//     books.push(_createBook())

//     utilService.saveToStorage(BOOKS_KEY, books)
//   }
// }
// function _createBook() {
//   const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//   return {
//     id: utilService.makeId(),
//     title: utilService.makeLorem(2),
//     subtitle: utilService.makeLorem(4),
//     authors: [utilService.makeLorem(1)],
//     publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//     description: utilService.makeLorem(20),
//     pageCount: utilService.getRandomIntInclusive(20, 600),
//     categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//     thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
//     language: 'en',
//     listPrice: {
//       amount: utilService.getRandomIntInclusive(80, 500),
//       currencyCode: 'EUR',
//       isOnSale: Math.random() > 0.7,
//     },
//   }
// }
