import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyEvents,
  publishEvent,
  cancelEvent,
} from "../api/event";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyEvents();
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || "Unable to load your events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function handlePublish(id) {
    try {
      setError("");
      setMessage("");

      await publishEvent(id);

      setMessage("Event published successfully.");
      await loadEvents();
    } catch (err) {
      setError(err.message || "Unable to publish event.");
    }
  }

  async function handleCancel(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await cancelEvent(id);

      setMessage("Event cancelled successfully.");
      await loadEvents();
    } catch (err) {
      setError(err.message || "Unable to cancel event.");
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Organizer</p>
          <h1>Manage Events</h1>
          <p>Create, review, publish and cancel your events.</p>
        </div>

        <Link className="primary-link" to="/events/create">
          + Create Event
        </Link>
      </section>

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {loading && <p>Loading your events...</p>}

      {!loading && !error && events.length === 0 && (
        <div className="empty-state">
          <h2>No events yet</h2>
          <p>Create your first event to get started.</p>
        </div>
      )}

      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            <div className="event-card-top">
              <span className="event-category">
                {event.category}
              </span>

              <span className="event-status">
                {event.status}
              </span>
            </div>

            <h2>{event.title}</h2>

            <p>
              {event.description || "No description provided."}
            </p>

            <div className="event-info">
              <p>
                <strong>Starts:</strong>{" "}
                {formatDate(event.startDateTime)}
              </p>

              <p>
                <strong>Venue:</strong>{" "}
                {event.venue}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {event.capacity}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {Number(event.ticketPrice) === 0
                  ? "Free"
                  : `?${event.ticketPrice}`}
              </p>
            </div>

            <div className="event-actions">
              {event.status !== "CANCELLED" && (
                <Link to={`/events/${event.id}/edit`}>
                  Edit
                </Link>
              )}

              {event.status === "DRAFT" && (
                <button
                  type="button"
                  onClick={() => handlePublish(event.id)}
                >
                  Publish
                </button>
              )}

              {event.status !== "CANCELLED" && (
                <button
                  type="button"
                  onClick={() => handleCancel(event.id)}
                >
                  Cancel Event
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
