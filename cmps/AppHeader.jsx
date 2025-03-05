const { Link, NavLink, useLocation } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function AppHeader() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Handle clicks outside of the menu to close it
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

  // App Logos
  const appLogos = {
    '/book': './assets/imgs/logo-books.png',
    '/mail': './assets/imgs/logo-mail.png',
    '/note': './assets/imgs/logo-note.png',
    '/': './assets/imgs/main-logo.png',
  }

  // Determine the correct logo based on the path
  let currentLogo = appLogos['/']
  for (const path in appLogos) {
    if (location.pathname.startsWith(path)) {
      currentLogo = appLogos[path]
      break
    }
  }

  const extraClass =
    location.pathname.startsWith('/note') ||
    location.pathname.startsWith('/mail')
      ? ''
      : 'logo-size'

  return (
    <header className="app-header">
      <Link to="/">
        <img
          src={currentLogo}
          alt="App Logo"
          className={`app-logo ${extraClass}`}
        />
      </Link>

      {/* Regular Navbar  */}
      <nav className="header-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Keepy</NavLink>
        <NavLink to="/book">Miss Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      {/* Hamburger Navigation Menu  */}
      <div className="nav-menu-container">
        <button
          className="menu-toggle"
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen((prev) => !prev)
          }}
        >
          ☰
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="nav-menu-content">
            <NavLink
              to="/"
              className="nav-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-menu-text">Home</span>
            </NavLink>
            <NavLink
              to="/mail"
              className="nav-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-menu-text">Mail</span>
            </NavLink>
            <NavLink
              to="/note"
              className="nav-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-menu-text">Keepy</span>
            </NavLink>
            <NavLink
              to="/book"
              className="nav-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-menu-text">Miss Books</span>
            </NavLink>
            <NavLink
              to="/about"
              className="nav-menu-item"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-menu-text">About</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
