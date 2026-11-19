
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import "./App.css";

const API = "http://localhost:3001/api";

function App() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const emptyForm = {
    title: "",
    sport: "Cricket",
    date: "",
    venue: "",
    maxParticipants: 50,
  };

  const [form, setForm] = useState(emptyForm);

  const [participant, setParticipant] = useState({
    participantName: "",
    participantEmail: "",
  });

  async function loadData() {
    setLoading(true);

    try {
      const [eventResponse, registrationResponse] =
        await Promise.all([
          fetch(`${API}/events`),
          fetch(`${API}/registrations`),
        ]);

      if (!eventResponse.ok) {
        throw new Error("Unable to load events");
      }

      const eventData = await eventResponse.json();
      setEvents(eventData);

      if (registrationResponse.ok) {
        const registrationData = await registrationResponse.json();
        setRegistrations(registrationData);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSaveEvent(e) {
    e.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      maxParticipants: Number(form.maxParticipants),
    };

    try {
      const response = await fetch(
        editingId
          ? `${API}/events/${editingId}`
          : `${API}/events`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save event");
      }

      setMessage(
        editingId
          ? "Event updated successfully!"
          : "New event created successfully!"
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleEdit(event) {
    setEditingId(event._id);

    setForm({
      title: event.title,
      sport: event.sport,
      date: event.date ? event.date.slice(0, 10) : "",
      venue: event.venue,
      maxParticipants: event.maxParticipants,
    });

    setShowForm(true);
    setMessage("");

    document.getElementById("events")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function handleDelete(event) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) return;

    setMessage("");

    try {
      const response = await fetch(
        `${API}/events/${event._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete event");
      }

      setMessage("Event deleted successfully!");

      if (selectedEvent?._id === event._id) {
        setSelectedEvent(null);
      }

      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...participant,
          eventId: selectedEvent._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("You have registered successfully!");

      setParticipant({
        participantName: "",
        participantEmail: "",
      });

      setSelectedEvent(null);
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  const filteredEvents = events.filter((event) =>
    `${event.title} ${event.sport} ${event.venue}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalParticipants = registrations.length;

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-container">
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              COMMUNITY SPORTS PLATFORM
            </span>

            <h1>
              Play Together.
              <br />
              Grow Together.
            </h1>

            <p>
              Discover local sports events, connect with players
              and become part of an active sports community.
            </p>

            <a href="#events">
              <button className="primary-btn">
                Explore Events →
              </button>
            </a>
          </div>

          <div className="hero-icon">🏆</div>
        </section>

        <div className="section-heading">
          <div>
            <h2>Dashboard Overview</h2>
            <p>Your community sports activity at a glance.</p>
          </div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Sports Events</p>
            <h2>{events.length}</h2>
          </div>

          <div className="stat-card">
            <p>Total Registrations</p>
            <h2>{totalParticipants}</h2>
          </div>

          <div className="stat-card">
            <p>Sports Categories</p>
            <h2>
              {new Set(events.map((event) => event.sport)).size}
            </h2>
          </div>

          <div className="stat-card">
            <p>Available Slots</p>
            <h2>
              {events.reduce(
                (total, event) =>
                  total + Number(event.maxParticipants || 0),
                0
              )}
            </h2>
          </div>
        </section>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <section id="events">
          <div className="section-heading">
            <div>
              <h2>Explore Sports Events</h2>
              <p>Find your next game and join the community.</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              {showForm ? "Close Form" : "+ Create Event"}
            </button>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search by event, sport or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {showForm && (
            <div className="form-panel">
              <h2>
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>

              <form onSubmit={handleSaveEvent}>
                <input
                  name="title"
                  placeholder="Event title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />

                <select
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  required
                >
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                <input
                  name="venue"
                  placeholder="Event venue"
                  value={form.venue}
                  onChange={handleChange}
                  required
                />

                <input
                  name="maxParticipants"
                  type="number"
                  min="1"
                  placeholder="Maximum participants"
                  value={form.maxParticipants}
                  onChange={handleChange}
                  required
                />

                <button className="primary-btn" type="submit">
                  {editingId ? "Save Changes" : "Create Event"}
                </button>

                <button
                  className="secondary-btn"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="empty-state">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="empty-state">
              No sports events found. Create your first event!
            </div>
          ) : (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event._id}>
                  <span className="sport-tag">{event.sport}</span>

                  <h3>{event.title}</h3>

                  <p>
                    📅 {new Date(event.date).toLocaleDateString("en-IN")}
                  </p>

                  <p>📍 {event.venue}</p>

                  <p>
                    👥 Maximum participants: {event.maxParticipants}
                  </p>

                  <button
                    className="primary-btn"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Register
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>

                  <button
                    className="danger-btn"
                    onClick={() => handleDelete(event)}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {selectedEvent && (
          <section className="form-panel">
            <h2>Register for {selectedEvent.title}</h2>

            <form onSubmit={handleRegister}>
              <input
                placeholder="Your full name"
                value={participant.participantName}
                onChange={(e) =>
                  setParticipant({
                    ...participant,
                    participantName: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Your email address"
                value={participant.participantEmail}
                onChange={(e) =>
                  setParticipant({
                    ...participant,
                    participantEmail: e.target.value,
                  })
                }
                required
              />

              <button className="primary-btn" type="submit">
                Confirm Registration
              </button>

              <button
                className="secondary-btn"
                type="button"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section id="registrations">
          <div className="section-heading">
            <div>
              <h2>Participant Registrations</h2>
              <p>View participants registered for community events.</p>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="empty-state">
              No registrations yet.
            </div>
          ) : (
            <div className="registrations-list">
              {registrations.map((registration) => (
                <div
                  className="registration-item"
                  key={registration._id}
                >
                  <div>
                    <strong>{registration.participantName}</strong>
                    <p>{registration.participantEmail}</p>
                    <p>
                      Event:{" "}
                      {registration.event?.title || "Event unavailable"}
                    </p>
                  </div>

                  <span className="sport-tag">Registered</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="about">
          <div className="section-heading">
            <div>
              <h2>Join Our Community</h2>
              <p>
                Create an account to connect with your sports community.
              </p>
            </div>
          </div>

          <div className="auth-panel">
            <Auth />
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 PLAYHUB. Community Sports Participation Platform.
      </footer>
    </div>
  );
}

export default App;
