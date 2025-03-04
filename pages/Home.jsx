const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home-container">
      <h1 className="home-page-header">Appsus</h1>
      <h5>Your go-to app for notes, mail, and books</h5>
      <nav className="apps-container">
        <Link to="/note" className="home-logo-box">
          <img
            src="./assets/imgs/logo-note.png"
            alt="Notes"
            className="home-logo"
          />
        </Link>
        <Link to="/mail" className="home-logo-box ">
          <img
            src="./assets/imgs/logo-mail.png"
            alt="Mail"
            className="home-logo"
          />
        </Link>
        <Link to="/book" className="home-logo-box ">
          <img
            src="./assets/imgs/logo-books.png"
            alt="Books"
            className="home-logo home-book-logo"
          />
        </Link>
      </nav>
    </section>
  )
}
