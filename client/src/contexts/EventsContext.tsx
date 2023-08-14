import { Dispatch, createContext, useReducer, useEffect } from "react";
import { EventInput } from "@fullcalendar/core/index.js";
import { ACTIONTYPE, eventsReducer } from "../reducers/eventsReducer";
import axios from "axios";

export const EventsContext = createContext<EventInput[]>([]);
export const EventsDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null,
);

//const initialEvents = [
//  {
//    id: crypto.randomUUID(),
//    title: "First event",
//    start: "2023-08-10T00:00:00Z",
//    end: "",
//    description: "Hello there",
//    allDay: true,
//  },
//  {
//    id: "1",
//    title: "Second event",
//    start: "2023-08-08T03:08:32.290Z",
//    end: "",
//    description: "",
//    allDay: false,
//  },
//  {
//    id: crypto.randomUUID(),
//    title: "Third event",
//    start: "2023-08-07T06:40:00Z",
//    end: "",
//    description: "",
//    allDay: false,
//  },
//];

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, dispatch] = useReducer(eventsReducer, []);

  useEffect(() => {
    fetchEvents()
      .then((result) => {
        dispatch({
          type: "fetched",
          payload: result.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  async function fetchEvents() {
    //return await axios.get("http://localhost:4000/events");
    return await axios.get("/api/events");
  }

  return (
    <EventsContext.Provider value={events}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsContext.Provider>
  );
}
