import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="card">
        <h1>Event Management System</h1>
        <p className="subtitle">
          A system to manage and organize events with registrations.
        </p>
        {user ? (
          <Link className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", lineHeight: "20px" }} to="/dashboard">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", lineHeight: "20px", marginBottom: 10 }} to="/register">
              Create an Account
            </Link>
            <div className="form-footer">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
