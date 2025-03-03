const { Link } = ReactRouterDOM
const { useState } = React

export function NotesSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`sidebar ${isHovered ? 'open' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="sidebar-content">
        <Link to="/note" className="sidebar-item">
          <i className="fas fa-lightbulb"></i>
          <span className="sidebar-text">Notes</span>
        </Link>
        <Link to="/note/archive" className="sidebar-item">
          <i className="fas fa-box"></i>
          <span className="sidebar-text">Archive</span>
        </Link>
        <Link to="/note/trash" className="sidebar-item">
          <i className="fas fa-trash"></i>
          <span className="sidebar-text">Trash</span>
        </Link>
      </nav>
    </div>
  )
}
