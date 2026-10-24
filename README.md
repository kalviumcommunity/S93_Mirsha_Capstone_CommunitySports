# Mock UX – Community Sports Participation Tracking

## Figma link:
https://www.figma.com/design/ctuFgtsYLR18QGxnSoOfIV/Community-Sports--Mock-UX-Design?node-id=0-1&t=iJ6GuhXqhuv10ejx-1

## 1. Home / Dashboard
The dashboard helps participants discover upcoming community sports events and navigate to the main sections of the application.

## 2. Sports Events
This screen displays available sports events with their names, dates, venues, and available slots. Users can select an event to view its details.

## 3. Event Registration
This screen allows participants to register for a selected event by submitting the required details. A success message confirms successful registration.

## 4. My Registrations
This screen displays the participant's registered events, event dates, venues, and registration status.

## 5. Admin Dashboard
This screen allows administrators to create and manage sports events, view participants, monitor registrations, and mark attendance.

## Design Reasoning
The navigation is kept simple so users can find important features quickly. Event information is displayed before registration to help participants make informed decisions. Registration status is shown clearly, while administrative actions are separated from participant features.

## Empty and Error States
If no events are available, the application displays “No upcoming events available.” If registration fails, it displays an error message and allows the user to try again. If no registrations exist, the My Registrations page displays a helpful empty-state message.

## User Flow
Home → Sports Events → Event Details → Event Registration → Registration Successful → My Registrations.

Admin Flow: Admin Login → Admin Dashboard → Manage Events → View Participants → Mark Attendance.