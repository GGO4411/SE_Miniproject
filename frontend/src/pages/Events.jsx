import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicEvents } from "../api/event";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents(filters = {}) {
    try {
      setLoading(true);
      setError("");

      const data = await getPublicEvents(filters);
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || "Unable to load events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    const filters = {};

    if (search.trim()) {
      filters.search = search.trim();
    }

    if (category.trim()) {
      filters.category = category.trim();
    }

    loadEvents(filters);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    loadEvents();
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Discover</p>
          <h1>Upcoming Events</h1>
          <p>
            Explore published events and find something worth attending.
          </p>
        </div>
      </section>

      <form className="event-filters" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Search</button>

        <button type="button" onClick={clearFilters}>
          Clear
        </button>
      </form>

      {loading && <p>Loading events...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <div className="empty-state">
          <h2>No events found</h2>
          <p>
            There are currently no published upcoming events matching your
            search.
          </p>
        </div>
      )}

      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            <div className="event-card-top">
              <span className="event-category">{event.category}</span>
              <span className="event-status">{event.status}</span>
            </div>

            <h2>{event.title}</h2>

            <p>{event.description || "No description provided."}</p>

            <div className="event-info">
              <p>
                <strong>Starts:</strong> {formatDate(event.startDateTime)}
              </p>

              <p>
                <strong>Venue:</strong> {event.venue}
              </p>

              <p>
                <strong>Capacity:</strong> {event.capacity}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {Number(event.ticketPrice) === 0
                  ? "Free"
                  : `₹${event.ticketPrice}`}
              </p>

              {event.organizer?.name && (
                <p>
                  <strong>Organizer:</strong> {event.organizer.name}
                </p>
              )}
            </div>

            <Link
              className="event-details-link"
              to={`/events/${event.id}`}
            >
              View Details
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}