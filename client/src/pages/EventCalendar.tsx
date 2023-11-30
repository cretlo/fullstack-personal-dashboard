import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../contexts/EventsContext";
import { useEventsContext } from "../contexts/EventsContext";
// Full calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5 from "@fullcalendar/bootstrap5";
import type {
    DateSelectArg,
    EventClickArg,
    EventInput
    //  EventInput,
} from "@fullcalendar/core/index.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import EventModal from "../components/events/EventModal";
import { useAlertContext } from "../contexts/AlertContext";
import dayjs from "dayjs";

const EventCalendar = () => {
    const { state, clearError } = useEventsContext();
    const { events, error } = state;
    const { setAlert } = useAlertContext();
    const [isNewEvent, setIsNewEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currEvent, setCurrEvent] = useState<EventInput>({
        id: "-1",
        title: "",
        start: "",
        end: "",
        description: "",
        allDay: true
    });

    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
    }, [error]);

    function handleShowModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setCurrEvent({
            title: "",
            description: "",
            start: "",
            end: "",
            allDay: true
        });
    }

    // Needed since fullcalendar doesnt include a day at midnight
    //const adjustedEvents: EventInput[] = events.map((event) => {
    //    if (event.end) {
    //        return {
    //            ...event,
    //            end: dayjs(event.end?.toString())
    //                .add(1, "day")
    //                .toISOString(),
    //        };
    //    }

    //    return event;
    //});

    function handleClick(arg: EventClickArg) {
        const { extendedProps, ...calendarEvent } = arg.event.toPlainObject();

        const currEvent = {
            ...calendarEvent,
            ...extendedProps
        };
        //
        // This is needed since fullcalendar converts the date to local time,
        // so switching back to ISOstring prevents it from getting saved as a day
        // prior which kept occurring without this fix
        currEvent.start = dayjs(currEvent.start).toISOString();

        // Full calendar strips end if it is null
        // must add it back for the EventModal to use
        if (!currEvent.end) {
            currEvent.end = "";
        } else {
            // Explanation above with currEvent.start
            currEvent.end = dayjs(currEvent.end).toISOString();
        }

        setCurrEvent({
            ...currEvent,
            ...extendedProps
        });
        setIsNewEvent(false);
        handleShowModal();
    }

    function handleSelect(selectInfo: DateSelectArg) {
        const { allDay, start, end } = selectInfo;

        const newEvent: EventInput = {
            title: "",
            description: "",
            start,
            end,
            allDay
        };

        setCurrEvent(newEvent);
        setIsNewEvent(true);
        setShowModal(true);
    }

    return (
        <>
            <div className="container-fluid container-lg">
                <FullCalendar
                    //dateClick={handleSelect}
                    contentHeight={"auto"}
                    events={events}
                    selectable={true}
                    editable={true}
                    eventClick={handleClick}
                    themeSystem="bootstrap5"
                    select={handleSelect}
                    plugins={[dayGridPlugin, interactionPlugin, bootstrap5]}
                    initialView="dayGridMonth"
                />
            </div>
            <EventModal
                key={currEvent.id}
                event={currEvent}
                setEvent={setCurrEvent}
                isNewEvent={isNewEvent}
                show={showModal}
                onShow={handleShowModal}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default EventCalendar;
