
import { useState } from "react";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Community Cricket Tournament",
      sport: "Cricket",
      date: "November 15, 2026",
      venue: "Community Sports Ground",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    sport: "",
    date: "",
    venue: "",
  });

  function handleEdit(event) {
    setEditingId(event.id);
    setEditForm({
      title: event.title,
      sport: event.sport,
      date: event.date,
      venue: event.venue,
    });
    setMessage("Edit the event details below.");
  }

  function handleSaveEdit(e) {
    e.preventDefault();

    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event.id === editingId
          ? { ...event, ...editForm }
          : event
      )
    );

    setEditingId(null);
    setMessage("Event updated successfully!");
  }

  function handleDelete(id) {
    setEvents((previousEvents) =>
      previousEvents.filter((event) => event.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
    }

    setMessage("Event deleted successfully!");
  }

  return (
    <>
      <Navbar />

      <main id="home">
        <h1>Community Sports Events</h1>
        <p>Explore sports events and join your community.</p>

        {message && <p>{message}</p>}

        <section id="events">
          <h2>Available Events</h2>

          {events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onRegister={() =>
                  setMessage(`You selected ${event.title}!`)
                }
                onEdit={() => handleEdit(event)}
                onDelete={() => handleDelete(event.id)}
              />
            ))
          )}
        </section>

        {editingId !== null && (
          <section>
            <h2>Edit Event</h2>

            <form onSubmit={handleSaveEdit}>
              <input
                value={editForm.title}
                placeholder="Event title"
                required
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    title: e.target.value,
                  })
                }
              />

              <input
                value={editForm.sport}
                placeholder="Sport"
                required
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    sport: e.target.value,
                  })
                }
              />

              <input
                value={editForm.date}
                placeholder="Date"
                required
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    date: e.target.value,
                  })
                }
              />

              <input
                value={editForm.venue}
                placeholder="Venue"
                required
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    venue: e.target.value,
                  })
                }
              />

              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section id="registrations">
          <h2>My Registrations</h2>
          <p>Your registered events will appear here.</p>
        </section>
      </main>
    </>
  );
}

export default App;
