import { EventInput } from "@fullcalendar/core/index.js";

export type ACTIONTYPE =
  | { type: "added"; payload: EventInput }
  | { type: "updated"; payload: EventInput }
  | { type: "deleted"; payload: string };

export function eventsReducer(events: EventInput[], action: ACTIONTYPE) {
  switch (action.type) {
    case "added": {
      return [...events, action.payload];
    }
    case "updated": {
      return events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }

        return event;
      });
    }
    case "deleted": {
      return events.filter((event) => {
        return event.id !== action.payload;
      });
    }
    default: {
      throw new Error();
    }
  }
}
