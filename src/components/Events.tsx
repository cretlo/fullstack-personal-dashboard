import { useContext, useState, useMemo } from "react";
import { EventsContext } from "../contexts/EventsContext";
import EventModal from "./EventModal";
import { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";
//import EventModal from "./EventModal";

const Events = () => {
  const events = useContext(EventsContext);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currEvent, setCurrEvent] = useState<EventInput>({
    id: crypto.randomUUID(),
    title: "",
    start: "",
    end: "",
    description: "",
    allDay: true,
  });
  const sortedEvents = useMemo(() => {
    console.log("Begin Sorting Events...");
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
      id: crypto.randomUUID(),
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
    const startDate = new Date(event.start?.toString() ?? nullDate);
    const endDate = new Date(event.end?.toString() ?? nullDate);
    const dateTimeFormatter = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "short",
      timeStyle: "short",
    });
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);

    let startDateStr;
    let endDateStr;

    if (event.allDay) {
      startDateStr = !startDate.getTime()
        ? "Invalid Date"
        : dateFormatter.format(startDate);
    } else {
      startDateStr = !startDate.getTime()
        ? "Invalid Date"
        : dateTimeFormatter.format(startDate);
    }

    endDateStr = !endDate.getTime()
      ? ""
      : " - " + dateFormatter.format(endDate);

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
      <div className="card p-3 bg-secondary">
        <ul
          className="list-group overflow-scroll"
          style={{ maxHeight: "80vh" }}
        >
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
                  <small>
                    <u>{fullDateStr}</u>
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
        isNewEvent={isNewEvent}
        show={showModal}
        onShow={handleShowModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Events;
