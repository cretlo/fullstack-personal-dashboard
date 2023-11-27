import { FormEvent } from "react";
import type { ChangeEvent } from "react";
import type { EventInput } from "@fullcalendar/core/index.js";
import { Modal } from "react-bootstrap";
import dayjs from "dayjs";

import { useEventsContext } from "../../contexts/EventsContext";

// Utils
import { toDate, toDateTime } from "../../utils/dateFormat";

interface Props {
    event: EventInput;
    setEvent: (event: EventInput) => void;
    isNewEvent: boolean;
    show: boolean;
    onShow: () => void;
    onClose: () => void;
}

const EventModal = ({ event, setEvent, isNewEvent, show, onClose }: Props) => {
    // const { addEvent, updateEvent, deleteEvent } = useContext(EventsContext);
    const { addEvent, updateEvent, deleteEvent } = useEventsContext();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const inputName = e.currentTarget.name;

        switch (inputName) {
            case "title": {
                setEvent({
                    ...event,
                    title: e.currentTarget.value,
                });
                return;
            }
            case "description": {
                setEvent({ ...event, description: e.currentTarget.value });
                return;
            }
            case "start":
            case "end": {
                if (e.currentTarget.value === "") {
                    // Clear button pressed
                    setEvent({
                        ...event,
                        [inputName]: "",
                    });
                    return;
                }

                setEvent({
                    ...event,
                    [inputName]: dayjs(e.currentTarget.value).toISOString(),
                });
                return;
            }
            case "allDay": {
                setEvent({ ...event, allDay: e.currentTarget.checked });
                return;
            }
        }
    }

    async function handleDelete() {
        if (isNewEvent) return;

        deleteEvent(event);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (isNewEvent) {
            addEvent(event);
        } else {
            updateEvent(event);
        }
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                {isNewEvent ? "Create Event" : "Edit Event"}
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            required
                            value={event.title}
                            className="form-control"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            value={event.description}
                            className="form-control"
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {event.allDay
                                ? "Start Date"
                                : "Start Date and Time"}
                        </label>
                        <input
                            type={event.allDay ? "date" : "datetime-local"}
                            required
                            value={
                                event.allDay
                                    ? toDate(event.start)
                                    : toDateTime(event.start)
                            }
                            className="form-control"
                            name="start"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            value={toDate(event.end)}
                            className="form-control"
                            name="end"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check mb-3">
                        <label className="form-check-label">All Day</label>
                        <input
                            type="checkbox"
                            checked={event.allDay}
                            className="form-check-input"
                            name="allDay"
                            onChange={handleChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                    <button
                        onClick={() => onClose()}
                        type="button"
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleDelete}
                        type="submit"
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EventModal;
