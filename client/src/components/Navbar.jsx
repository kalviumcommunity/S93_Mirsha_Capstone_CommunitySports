
function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="brand">
        PLAY<span>HUB.</span>
      </a>

      <div className="nav-links">
        <a href="#home">Dashboard</a>
        <a href="#events">Sports Events</a>
        <a href="#registrations">My Registrations</a>
        <a href="#about">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
