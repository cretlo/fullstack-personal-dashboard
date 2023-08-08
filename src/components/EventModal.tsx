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
  isNewEvent: boolean;
  show: boolean;
  onShow: () => void;
  onClose: () => void;
}

const EventModal = ({ initialEvent, isNewEvent, show, onClose }: Props) => {
  const dispatch = useContext(EventsDispatchContext);
  const [event, setEvent] = useState(initialEvent);

  function toDateTimeLocal(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DDTHH:mm:ss");
  }

  function toDate(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DD");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.name === "allDay") {
      console.log("Changing all day", e.currentTarget.checked);
      setEvent({ ...event, allDay: e.currentTarget.checked });
    } else if (
      e.currentTarget.type === "date" ||
      e.currentTarget.type === "datetime-local"
    ) {
      setEvent({
        ...event,
        [e.currentTarget.name]: dayjs(e.currentTarget.value).toISOString(),
      });
    } else {
      setEvent({
        ...event,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!dispatch) return;

    if (isNewEvent) {
      dispatch({
        type: "added",
        payload: event,
      });
    } else {
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
                  value={toDate(event.start)}
                  className="form-control"
                  name="start"
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">Start Date and Time</label>
                <input
                  type="datetime-local"
                  required
                  value={toDateTimeLocal(event.start)}
                  className="form-control"
                  name="start"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
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
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EventModal;
