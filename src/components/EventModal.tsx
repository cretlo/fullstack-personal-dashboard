import { ChangeEvent, useState } from "react";
import { EventInput } from "@fullcalendar/core/index.js";
import { Modal } from "react-bootstrap";

interface Props {
  initialEvent: EventInput;
}

const EventModal = ({ initialEvent }: Props) => {
  const [event, setEvent] = useState(initialEvent ? initialEvent : {});
  const [isAllDay, setIsAllDay] = useState(true);
  const [show, setShow] = useState(true);
  console.log(event);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const copiedEvent = Object.assign(event);
    if (e.currentTarget.name === "allDay") {
      setEvent({ ...copiedEvent, allDay: e.currentTarget.checked });
    } else {
      setEvent({
        ...copiedEvent,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header>Create Event</Modal.Header>
      <form>
        <Modal.Body>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              required
              defaultValue={new Date().toLocaleDateString()}
              name="start"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" name="end" onChange={handleChange} />
          </div>
          <div>
            <label>All Day</label>
            <input type="checkbox" name="allDay" onChange={handleChange} />
          </div>
          {!event.allDay && (
            <div>
              <label>Time</label>
              <input type="time" required />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            onClick={() => setShow(false)}
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
