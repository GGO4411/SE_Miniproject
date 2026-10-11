
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import EditEvent from "./pages/EditEvent";

const organizerRoles = ["ORGANIZER", "ADMIN"];

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events />} />
        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        {/* Authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Organizer and Admin only */}
        <Route
          path="/events/create"
          element={
            <ProtectedRoute roles={organizerRoles}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-events"
          element={
            <ProtectedRoute roles={organizerRoles}>
              <ManageEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id/edit"
          element={
            <ProtectedRoute roles={organizerRoles}>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        {/* Unknown URLs */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}
