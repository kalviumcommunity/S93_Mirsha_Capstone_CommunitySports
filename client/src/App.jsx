import { useState } from "react";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <Navbar />

      <main id="home">
        <h1>Community Sports Events</h1>
        <p>Explore sports events and join your community.</p>

        {message && <p>{message}</p>}

        <section id="events">
          <EventCard
            title="Community Cricket Tournament"
            sport="Cricket"
            date="November 15, 2026"
            venue="Community Sports Ground"
            onRegister={() =>
              setMessage("You selected Community Cricket Tournament!")
            }
          />
        </section>

        <section id="registrations">
          <h2>My Registrations</h2>
          <p>Your registered events will appear here.</p>
        </section>
      </main>
    </>
  );
}

export default App;