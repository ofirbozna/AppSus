const { useState, useEffect, useRef } = React
const { Link, useLocation } = ReactRouterDOM

export function NotesSidebar() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Handle clicks outside of the sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="note-side-bar">
      {/* Hamburger Button  */}
      <button
        className={`sidebar-toggle ${isMenuOpen ? 'hide-toggle' : ''}`}
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          setIsMenuOpen((prev) => !prev)
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${isHovered || isMenuOpen ? 'open' : ''} ${
          isMenuOpen ? 'menu-open' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={menuRef}
      >
        <nav className="sidebar-content">
          <Link
            to="/note"
            className={`sidebar-item ${
              location.pathname.startsWith('/note') ? 'active' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-lightbulb"></i>
            <span className="sidebar-text">Notes</span>
          </Link>
          <Link
            to="/note/archive"
            className={`sidebar-item ${
              location.pathname.startsWith('/note/archive') ? 'active' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-box"></i>
            <span className="sidebar-text">Archive</span>
          </Link>
          <Link
            to="/note/trash"
            className={`sidebar-item ${
              location.pathname.startsWith('/note/trash') ? 'active' : ''
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-trash"></i>
            <span className="sidebar-text">Trash</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
