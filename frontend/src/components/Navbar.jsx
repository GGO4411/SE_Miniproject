
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const isOrganizer =
    user?.role === "ORGANIZER" || user?.role === "ADMIN";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Event Management System
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/events" className={navLinkClass}>
          Explore Events
        </NavLink>

        {!loading && user && (
          <>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            {isOrganizer && (
              <>
                <NavLink
                  to="/manage-events"
                  className={navLinkClass}
                >
                  Manage Events
                </NavLink>

                <NavLink
                  to="/events/create"
                  className={navLinkClass}
                >
                  Create Event
                </NavLink>
              </>
            )}

            <button
              type="button"
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

        {!loading && !user && (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>

            <NavLink to="/register" className={navLinkClass}>
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
