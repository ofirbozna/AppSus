import { noteService } from '../services/note.service.js'
const { useRef } = React

export function NoteVideo({ note }) {
  const noteTitleRef = useRef(null)
  const noteTxtRef = useRef(null)

  const embedUrl = convertToEmbedUrl(note.info.url)

  function convertToEmbedUrl(fullUrl) {
    if (!fullUrl) return

    // Check if it's already an embed URL
    if (fullUrl.includes('/embed/')) {
      // Return the URL up to any query parameters if it's already an embed URL
      return fullUrl.split('?')[0]
    }

    try {
      // Handle regular youtube urls
      const urlObj = new URL(fullUrl)

      // Handle youtu.be format
      if (urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.pathname.substring(1)
        return `https://www.youtube.com/embed/${videoId}`
      }

      // Handle regular youtube.com format
      const urlParams = new URLSearchParams(urlObj.search)
      const videoId = urlParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }

      return null
    } catch (err) {
      console.error('Invalid URL:', err)
      return null
    }
  }

  function changeContentTitle(ev) {
    note.info.title = noteTitleRef.current.innerText
    noteService.save(note)
  }

  function changeContent(ev) {
    note.info.txt = noteTxtRef.current.innerText
    noteService.save(note)
  }

  return (
    <section className="note-video">
      <h2
        ref={noteTitleRef}
        onKeyUp={(ev) => changeContentTitle(ev)}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {note.info.title}
      </h2>
      <div className="video-container">
        {embedUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="video-error">Invalid YouTube URL</div>
        )}
      </div>
      <p
        ref={noteTxtRef}
        onKeyUp={(ev) => changeContent(ev)}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {note.info.txt}
      </p>
    </section>
  )
}
