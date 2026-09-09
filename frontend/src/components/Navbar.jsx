function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Exploregypt</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/cities">Cities</a>
        <a href="/places">Places</a>
        <a href="/favorites">Favorites</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  )
}

export default Navbar