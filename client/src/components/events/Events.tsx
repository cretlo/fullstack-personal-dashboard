import { useContext, useState } from "react";
import { EventsContext } from "../../contexts/EventsContext";
import EventModal from "./EventModal";
import type { EventInput } from "@fullcalendar/core/index.js";
// Utils
import sortRecentEvents from "../../utils/sortRecentEvents";
import { getFullDateStr } from "../../utils/dateFormat";

const Events = () => {
    const { events } = useContext(EventsContext);
    const [isNewEvent, setIsNewEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currEvent, setCurrEvent] = useState<EventInput>({
        id: "-1",
        title: "",
        start: "",
        end: "",
        description: "",
        allDay: true,
    });

    // Events later than 2 days shouldn't be displayed
    const sortedEvents = sortRecentEvents(events);

    function handleChangeEvent(event: EventInput) {
        setCurrEvent(event);
        setIsNewEvent(false);
        handleShowModal();
    }

    function handleAddButtonClick() {
        const newEvent: EventInput = {
            id: "-1",
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

    return (
        <>
            <h2 className="mb-3">Upcoming Events</h2>
            <div className="d-grid mb-3">
                <button
                    type="button"
                    className="btn btn-primary py-2 "
                    onClick={handleAddButtonClick}
                >
                    Add Event
                </button>
            </div>
            <ul
                className="list-group overflow-scroll"
                style={{ maxHeight: "80vh" }}
            >
                {sortedEvents.map((event) => {
                    const fullDateStr = getFullDateStr(event);

                    return (
                        <button
                            key={event.id}
                            className={"list-group-item list-group-item-action"}
                            onClick={() => handleChangeEvent(event)}
                        >
                            <div className="d-flex justify-content-between">
                                <h4>{event.title}</h4>
                                <small className="text-muted">
                                    {fullDateStr}
                                </small>
                            </div>
                            {event.description && <p>{event.description}</p>}
                        </button>
                    );
                })}
            </ul>
            <EventModal
                key={currEvent.id}
                setEvent={setCurrEvent}
                event={currEvent}
                isNewEvent={isNewEvent}
                show={showModal}
                onShow={handleShowModal}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Events;
