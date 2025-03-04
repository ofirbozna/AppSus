const { useNavigate, useSearchParams } = ReactRouterDOM
const { useEffect } = React

export function NoteToMail({ note }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams({})

  function sendToMail(ev) {
    ev.stopPropagation()

    setSearchParams({
      subject: note.title,
      body: note.info.txt,
    })

    // setSearchParams({ subject: note.title, body: note.info.txt })
    // navigate(`/mail?${searchParams}`, { replace: true })

    console.log(
      'Search params set but not updated yet:',
      searchParams.get('subject'),
      searchParams.get('body')
    )
  }

  useEffect(() => {
    if (searchParams.get('subject') || searchParams.get('body')) {
      console.log('Updated searchParams:', searchParams.toString())

      setTimeout(() => {
        navigate(`/mail?${searchParams}`, { replace: true })
      }, 0)
    }
  }, [searchParams, navigate])

  return (
    <section className="note-to-mail">
      <button
        title="Email"
        onClick={(e) => {
          e.stopPropagation()
          sendToMail(e)
          console.log('note sent')
        }}
      >
        <i className="fas fa-envelope"></i>
      </button>
    </section>
  )
}
