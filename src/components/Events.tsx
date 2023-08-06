import { useContext, useState } from "react";
import { EventContext } from "../contexts/EventsContext";
import EventModal from "./EventModal";

const Events = () => {
  const events = useContext(EventContext);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  return (
    <>
      <h2 className="mb-3">Events</h2>
      <div className="card p-3 bg-secondary">
        <ul className="list-group">
          {events.map((event) => {
            const startDate = event.start?.toString();
            const endDate = event.end?.toString();
            const dateStr = event.end ? `${startDate} - ${endDate}` : startDate;

            return (
              <li key={event.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <h4>{event.title}</h4>
                  <small>
                    <u>{dateStr}</u>
                  </small>
                </div>
                {event.description && <p>{event.description}</p>}
              </li>
            );
          })}
        </ul>
      </div>
      <EventModal />
    </>
  );
};

export default Events;
