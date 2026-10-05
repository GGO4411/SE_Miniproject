import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="card dashboard-card">
        <h1>Welcome, {user.name}</h1>
        <p className="subtitle">
          <span className="badge">{user.role}</span>{" "}
          {!user.isVerified && "(email not yet verified)"}
        </p>

        <p>
          This is a placeholder dashboard proving the auth module works
          end-to-end: you registered, logged in, and this page is protected
          by <code>ProtectedRoute</code> + a verified JWT.
        </p>

        <p style={{ fontSize: 14, color: "#6b7684" }}>
          This is where the rest of the team's modules will plug in:
        </p>
        <ul className="module-list">
          <li>Event listing &amp; creation (Member 2)</li>
          <li>Event registration &amp; payment (Member 3)</li>
          <li>Notifications, QR check-in &amp; reporting (Member 4)</li>
        </ul>
      </div>
    </div>
  );
}
