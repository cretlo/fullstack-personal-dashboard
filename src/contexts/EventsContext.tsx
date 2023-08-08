import { Dispatch, createContext, useReducer } from "react";
import { EventInput } from "@fullcalendar/core/index.js";
import { ACTIONTYPE, eventsReducer } from "../reducers/eventsReducer";

export const EventsContext = createContext<EventInput[]>([]);
export const EventsDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null,
);

const initialEvents = [
  {
    id: crypto.randomUUID(),
    title: "First event",
    start: "2023-08-10T00:00:00Z",
    end: "",
    description: "Hello there",
    allDay: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Second event",
    start: "2023-08-07T04:25:45.000Z",
    end: "",
    description: "",
    allDay: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Third event",
    start: "2023-08-07T06:40:00Z",
    end: "",
    description: "",
    allDay: false,
  },
];

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, dispatch] = useReducer(eventsReducer, initialEvents);

  return (
    <EventsContext.Provider value={events}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsContext.Provider>
  );
}

//export const EventContext = createContext<EventInput[]>();
//[
//  {
//    id: "0",
//    title: "First event",
//    start: "2023-08-03T12:30:00Z",
//    description: "Hello there",
//  },
//  {
//    id: "1",
//    title: "Second event",
//    start: "2023-08-05",
//    end: "2023-08-20",
//  },
//]
