import { ChangeEvent, useState, useContext, FormEvent } from "react";
import { EventsDispatchContext } from "../contexts/EventsContext";
import { EventInput, DateInput } from "@fullcalendar/core/index.js";
import { Modal } from "react-bootstrap";
import dayjs from "dayjs";

//interface MyEventInput extends EventInput {
//  title: string;
//  start: string;
//  description: string;
//  allDay: boolean;
//}

interface Props {
  initialEvent: EventInput;
  show: boolean;
  onShow: () => void;
  onClose: () => void;
}

const EventModal = ({ initialEvent, show, onClose }: Props) => {
  const dispatch = useContext(EventsDispatchContext);
  const [event, setEvent] = useState(initialEvent);
  console.log(event);

  function toDateTimeLocal(dateISOStr: DateInput) {
    return dayjs(dateISOStr.toString()).format("YYYY-MM-DDTHH:mm:ss");
  }

  function toDate(dateISOStr: DateInput) {
    return dayjs(dateISOStr.toString()).format("YYYY-MM-DD");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const copiedEvent = Object.assign(event);

    if (e.currentTarget.name === "allDay") {
      setEvent({ ...copiedEvent, allDay: e.currentTarget.checked });
    } else if (e.currentTarget.type === "date") {
      setEvent({
        ...copiedEvent,
        [e.currentTarget.name]: toDate(e.currentTarget.value),
      });
    } else if (e.currentTarget.type === "datetime-local") {
      setEvent({
        ...copiedEvent,
        [e.currentTarget.name]: toDateTimeLocal(e.currentTarget.value),
      });
    } else {
      setEvent({
        ...copiedEvent,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!dispatch) return;

    if (initialEvent.start) {
      console.log("Adding");
      dispatch({
        type: "added",
        payload: event,
      });
    } else {
      console.log("Updating");
      dispatch({
        type: "updated",
        payload: event,
      });
    }
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>Create Event</Modal.Header>
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

          {event.allDay ? (
            <>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  required
                  value={event.start && toDate(event.start)}
                  className="form-control"
                  name="start"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  value={event.end && toDate(event.start)}
                  className="form-control"
                  name="end"
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  required
                  value={event.start && toDateTimeLocal(event.start.toString())}
                  className="form-control"
                  name="start"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
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
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EventModal;
