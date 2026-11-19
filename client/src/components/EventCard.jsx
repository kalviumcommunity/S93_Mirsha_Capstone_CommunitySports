
function EventCard({
  title,
  sport,
  date,
  venue,
  maxParticipants,
  onRegister,
  onEdit,
  onDelete,
}) {
  return (
    <article className="event-card">
      <span className="sport-tag">{sport}</span>

      <h3>{title}</h3>

      <p>📅 {date}</p>
      <p>📍 {venue}</p>
      <p>👥 Maximum participants: {maxParticipants}</p>

      <button className="primary-btn" onClick={onRegister}>
        Register
      </button>

      <button className="secondary-btn" onClick={onEdit}>
        Edit
      </button>

      {onDelete && (
        <button className="danger-btn" onClick={onDelete}>
          Delete
        </button>
      )}
    </article>
  );
}

export default EventCard;
