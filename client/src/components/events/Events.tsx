import { useContext, useState, useMemo } from "react";
import { EventsContext } from "../../contexts/EventsContext";
import EventModal from "./EventModal";
import { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

const Events = () => {
  const events = useContext(EventsContext);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currEvent, setCurrEvent] = useState<EventInput>({
    id: "0",
    title: "",
    start: "",
    end: "",
    description: "",
    allDay: true,
  });

  const sortedEvents = useMemo(() => {
    return sortEvents(filterEvents(events));
  }, [events]);

  function filterEvents(events: EventInput[]) {
    return events.filter((event) => {
      const aStartDate = dayjs(event.start?.toString());
      const today = dayjs();

      return aStartDate.isAfter(today.subtract(2, "day"));
    });
  }

  function sortEvents(events: EventInput[]) {
    return events.sort((a, b) => {
      const aStartDate = dayjs(a.start?.toString());
      const bStartDate = dayjs(b.start?.toString());
      const today = dayjs();

      if (aStartDate.isBefore(today.subtract(1, "day"))) {
        return 1;
      } else if (aStartDate.isBefore(bStartDate)) {
        return -1;
      } else if (aStartDate.isSame(bStartDate)) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  function handleChangeEvent(event: EventInput) {
    setCurrEvent(event);
    setIsNewEvent(false);
    handleShowModal();
  }

  function handleAddButtonClick() {
    const newEvent: EventInput = {
      id: "0",
      title: "",
      start: "",
      end: "",
      description: "",
      allDay: true,
    };
    setCurrEvent(newEvent);
    setIsNewEvent(true);
    handleShowModal();
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function getFullDateStr(event: EventInput): string {
    const nullDate = new Date(0);
    const startDate = dayjs(event.start?.toString() ?? nullDate);
    const endDate = dayjs(event.end?.toString() ?? nullDate);

    let startDateStr;
    let endDateStr;

    if (startDate.unix() === 0) {
      startDateStr = "Invalid Date";
    } else {
      startDateStr = event.allDay
        ? startDate.format("M/D/YYYY")
        : startDate.format("M/D/YYYY, h:mm a");
    }

    endDateStr = !endDate.unix() ? "" : " - " + endDate.format("M/D/YYYY");

    return startDateStr + endDateStr;
  }

  return (
    <>
      <h2 className="mb-3">Events</h2>
      <div className="d-grid mb-3">
        <button
          type="button"
          className="btn btn-primary py-2 "
          onClick={handleAddButtonClick}
        >
          Add Event
        </button>
      </div>
      <ul className="list-group overflow-scroll" style={{ maxHeight: "80vh" }}>
        {sortedEvents.map((event) => {
          const fullDateStr = getFullDateStr(event);

          return (
            <button
              key={event.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleChangeEvent(event)}
            >
              <div className="d-flex justify-content-between">
                <h4>{event.title}</h4>
                <small className="text-muted">{fullDateStr}</small>
              </div>
              {event.description && <p>{event.description}</p>}
            </button>
          );
        })}
      </ul>
      <EventModal
        key={currEvent.id}
        initialEvent={currEvent}
        isNewEvent={isNewEvent}
        show={showModal}
        onShow={handleShowModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Events;
