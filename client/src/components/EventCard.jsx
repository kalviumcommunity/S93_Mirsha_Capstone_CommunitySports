
import Button from "./Button";

function EventCard({
  title,
  sport,
  date,
  venue,
  onRegister,
  onEdit,
  onDelete,
}) {
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p>Sport: {sport}</p>
      <p>Date: {date}</p>
      <p>Venue: {venue}</p>

      <Button onClick={onRegister}>Register</Button>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
}

export default EventCard;
