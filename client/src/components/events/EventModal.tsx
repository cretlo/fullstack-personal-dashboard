import { ChangeEvent, useState, useContext, FormEvent } from "react";
import { EventsDispatchContext } from "../../contexts/EventsContext";
import { EventInput, DateInput } from "@fullcalendar/core/index.js";
import { Modal } from "react-bootstrap";
import dayjs from "dayjs";
import { useAxiosContext } from "../../contexts/AxiosContext";

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
  const { customAxios } = useAxiosContext();

  function toDateTime(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DDTHH:mm:ss");
  }

  function toDate(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DD");
  }

  function isValidDateRange(
    start: string | DateInput | undefined,
    end: string | DateInput | undefined,
  ) {
    if (!start || !end) return true;

    const startDate = dayjs(start?.toString()).toDate();
    const endDate = dayjs(end?.toString()).toDate();

    return startDate <= endDate;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.currentTarget.name;

    switch (inputName) {
      case "allDay": {
        setEvent({ ...event, allDay: e.currentTarget.checked });
        return;
      }
      case "start":
      case "end": {
        if (e.currentTarget.value === "") {
          // Clear button pressed
          setEvent({
            ...event,
            [inputName]: undefined,
          });
          return;
        }

        // Valid date range guard
        if (!isValidDateRange(event.start, e.currentTarget.value)) {
          // Throw an error
          console.log("Invalid date range");
          return;
        }

        setEvent({
          ...event,
          [inputName]: dayjs(e.currentTarget.value).toISOString(),
        });
        return;
      }
      default: {
        setEvent({
          ...event,
          [inputName]: e.currentTarget.value,
        });
      }
    }

    //if (e.currentTarget.name === "allDay") {
    //  setEvent({ ...event, allDay: e.currentTarget.checked });
    //  return;
    //}

    //if (
    //  e.currentTarget.type === "date" ||
    //  e.currentTarget.type === "datetime-local"
    //) {
    //  if (e.currentTarget.value === "") {
    //    // Clear button pressed
    //    setEvent({
    //      ...event,
    //      [e.currentTarget.name]: undefined,
    //    });
    //    return;
    //  }

    //  if (event.start && e.currentTarget.name === "end") {
    //  }

    //  setEvent({
    //    ...event,
    //    [e.currentTarget.name]: dayjs(e.currentTarget.value).toISOString(),
    //  });
    //  return;
    //}

    //setEvent({
    //  ...event,
    //  [e.currentTarget.name]: e.currentTarget.value,
    //});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!dispatch) return;

    if (isNewEvent) {
      try {
        const res = await customAxios.post("api/events", event);
        dispatch({
          type: "added",
          payload: res.data,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await customAxios.put(`api/events/${event.id}`, event);
        dispatch({
          type: "updated",
          payload: res.data,
        });
      } catch (err) {
        console.error(err);
      }
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
                  value={toDateTime(event.start)}
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
