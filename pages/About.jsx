export function About() {
  return (
    <section className="container about">
      <h1 className="about-title">About Appsus</h1>
      <p className="about-description">
        Appsus is an all-in-one productivity suite that includes three powerful
        applications:
      </p>

      <div className="app-boxes">
        <div className="app-box books">
          <img
            src="./assets/imgs/logo-books.png"
            alt="Miss Books Logo"
            className="about-app-books-logo"
          />
          <p className="app-description">
            A book management app where users can browse, review, and keep track
            of their favorite books.
          </p>
        </div>
        <div className="app-box mail">
          <img
            src="./assets/imgs/logo-mail.png"
            alt="Mail App Logo"
            className="about-app-mail-logo"
          />
          <p className="app-description">
            A robust email client for managing personal and professional
            communications efficiently.
          </p>
        </div>
        <div className="app-box keepy">
          <img
            src="./assets/imgs/logo-note.png"
            alt="Keepy Logo"
            className="about-app-note-logo"
          />
          <p className="app-description">
            A note-taking app designed for organizing thoughts, tasks, and
            important reminders.
          </p>
        </div>
      </div>

      <h2 className="about-us">About Us</h2>

      <div className="profiles">
        <div className="profile">
          <img
            src="./assets/imgs/nevo-pic.jpg"
            alt="Your Name"
            className="profile-pic circular"
          />
          <h2 className="profile-name">Nevo Yaakoby</h2>
          <p className="profile-description">
            I'm a 27-year-old Full-Stack Developer passionate about building web
            applications. I specialize in JavaScript, React, CSS, and more.
            Currently working on Appsus, an integrated platform to enhance
            productivity and organization.
          </p>
        </div>

        <div className="profile">
          <img
            src="./assets/imgs/ofir-pic.png"
            alt="Placeholder"
            className="profile-pic circular"
          />
          <h2 className="profile-name">Ofir Bozna</h2>
          <p className="profile-description">ofir about</p>
        </div>
      </div>
    </section>
  )
}
