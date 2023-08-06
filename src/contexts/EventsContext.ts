import { EventSourceInput, EventInput } from "@fullcalendar/core/index.js";
import { createContext } from "react";

export const EventContext = createContext<EventInput[]>([
  {
    id: "0",
    title: "First event",
    start: "2023-08-03T12:30:00Z",
    description: "Hello there",
  },
  {
    id: "1",
    title: "Second event",
    start: "2023-08-05",
    end: "2023-08-20",
  },
]);
