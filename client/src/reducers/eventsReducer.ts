import { EventInput } from "@fullcalendar/core/index.js";
import { EventsState } from "../types";

export type ACTIONTYPE =
    | { type: "fetched"; payload: EventInput[] }
    | { type: "added"; payload: EventInput }
    | { type: "updated"; payload: EventInput }
    | { type: "deleted"; payload: EventInput }
    | { type: "errored"; payload: string }
    | { type: "clear_error" };

export function eventsReducer(
    state: EventsState,
    action: ACTIONTYPE,
): EventsState {
    switch (action.type) {
        case "fetched": {
            return {
                ...state,
                events: action.payload,
            };
        }
        case "added": {
            //return [...events, action.payload];
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        }
        case "updated": {
            //return events.map((event) => {
            //    if (event.id === action.payload.id) {
            //        return action.payload;
            //    }

            //    return event;
            //});

            const updatedEvents = state.events.map((event) => {
                return event.id === action.payload.id ? action.payload : event;
            });

            return {
                ...state,
                events: updatedEvents,
            };
        }
        case "deleted": {
            //return events.filter((event) => {
            //    return event.id !== action.payload.id;
            //});
            const filteredEvents = state.events.filter((event) => {
                return event.id !== action.payload.id;
            });

            return {
                ...state,
                events: filteredEvents,
            };
        }
        case "errored": {
            return {
                ...state,
                error: action.payload,
            };
        }
        case "clear_error": {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
}
