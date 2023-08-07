import { useContext, useState } from "react";
import { EventsContext } from "../contexts/EventsContext";
import EventModal from "./EventModal";
import { EventInput } from "@fullcalendar/core/index.js";
//import EventModal from "./EventModal";

const Events = () => {
  const events = useContext(EventsContext);
  const [showModal, setShowModal] = useState(false);
  const [currEvent, setCurrEvent] = useState<EventInput>({});

  function handleChangeEvent(event: EventInput) {
    setCurrEvent(event);
    handleShowModal();
  }

  function handleAddEvent() {
    const newEvent: EventInput = {
      id: crypto.randomUUID(),
      title: "",
      start: "",
      end: "",
      description: "",
      allDay: true,
    };
    setCurrEvent(newEvent);
    handleShowModal();
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <h2 className="mb-3">Events</h2>
      <button onClick={handleAddEvent}>Add</button>
      <div className="card p-3 bg-secondary">
        <ul
          className="list-group overflow-scroll"
          style={{ maxHeight: "80vh" }}
        >
          {events.map((event) => {
            const startDate = event.start?.toString();
            const endDate = event.end?.toString();
            const dateStr = event.end ? `${startDate} - ${endDate}` : startDate;

            return (
              <button
                key={event.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleChangeEvent(event)}
              >
                <div className="d-flex justify-content-between">
                  <h4>{event.title}</h4>
                  <small>
                    <u>{dateStr}</u>
                  </small>
                </div>
                {event.description && <p>{event.description}</p>}
              </button>
            );
          })}
        </ul>
      </div>
      <EventModal
        key={currEvent.id}
        initialEvent={currEvent}
        show={showModal}
        onShow={handleShowModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Events;
