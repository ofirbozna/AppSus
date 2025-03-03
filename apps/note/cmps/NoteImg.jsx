import { noteService } from '../services/note.service.js'
const { useState, useEffect, useRef } = React

export function NoteImg({ note, onSaveNote }) {
  const [imageUrl, setImageUrl] = useState((note.info && note.info.img) || '')
  const titleRef = useRef(null)
  const fileInputRef = useRef(null)

  function changeContentTitle(ev) {
    if (note && titleRef.current) {
      note.info.title = titleRef.current.innerText
      onSaveNote && onSaveNote(note)
    }
  }

  function handleImageChange(ev) {
    const file = ev.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
        note.info.img = reader.result
        onSaveNote && onSaveNote(note)

        // Reset the file input value after processing
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
      reader.readAsDataURL(file)
    }
  }

  function handleImageClick() {
    // Reset the file input value before clicking
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    fileInputRef.current.click()
  }

  return (
    <section className="note-img css-fix">
      <h3 ref={titleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>
        {(note.info && note.info.title) || ''}
      </h3>
      <div className="image-container" onClick={handleImageClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={(note.info && note.info.title) || 'Image note'} />
        ) : (
          <div className="empty-image-placeholder">
            <i className="fas fa-image"></i>
            <p>Click to add an image</p>
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
    </section>
  )
}
