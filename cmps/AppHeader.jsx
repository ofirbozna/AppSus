const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
  const location = useLocation()

  // logos for different app
  const appLogos = {
    '/book': './assets/imgs/logo-books.png',
    '/mail': './assets/imgs/logo-mail.png',
    '/note': './assets/imgs/logo-note.png',
    '/': './assets/imgs/main-logo.png',
  }

  // Find the correct logo based on the path
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
    <header className="app-header ">
      <Link to="/">
        <img
          src={currentLogo}
          alt="App Logo"
          className={`app-logo ${extraClass}`}
        />
      </Link>
      <nav className="header-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Keepy</NavLink>
        <NavLink to="/book">Miss Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}
