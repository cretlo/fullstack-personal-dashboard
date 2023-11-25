import { createContext, useReducer, useEffect } from "react";
import { EventInput } from "@fullcalendar/core/index.js";
import { eventsReducer } from "../reducers/eventsReducer";
import { useAxiosContext } from "./AxiosContext";
import { AxiosError } from "axios";

interface ContextValue {
    events: EventInput[];
    fetchEvents: () => Promise<void>;
    addEvent: (event: EventInput) => Promise<void>;
    updateEvent: (event: EventInput) => Promise<void>;
    deleteEvent: (event: EventInput) => Promise<void>;
}

const initialContextValue: ContextValue = {
    events: [],
    fetchEvents: () => {
        console.log("Default fetchEvents implementation");
        return Promise.resolve();
    },
    addEvent: (_: EventInput) => {
        console.log("Default addEvent implementation");
        return Promise.resolve();
    },
    updateEvent: (_: EventInput) => {
        console.log("Default updateEvent implementation");
        return Promise.resolve();
    },
    deleteEvent: (_: EventInput) => {
        console.log("Default deleteEvent implementation");
        return Promise.resolve();
    },
};

export const EventsContext = createContext<ContextValue>(initialContextValue);

export function EventsProvider({ children }: { children: React.ReactNode }) {
    const [events, dispatch] = useReducer(eventsReducer, []);
    const { customAxios } = useAxiosContext();
    const baseApiUrl = import.meta.env.VITE_API_URL;

    if (!baseApiUrl) {
        throw new Error("Must provide vite with api url environment variable");
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            let res = await customAxios.get(`${baseApiUrl}/events`);

            dispatch({
                type: "fetched",
                payload: res.data,
            });
        } catch (err) {
            console.error("Failed fetching events: ", err);
        }
    }

    async function addEvent(event: EventInput) {
        try {
            const res = await customAxios.post(`${baseApiUrl}/events`, event);

            dispatch({
                type: "added",
                payload: res.data,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err?.response?.data);
            } else {
                console.error(err);
            }
        }
    }

    async function updateEvent(event: EventInput) {
        try {
            const res = await customAxios.put(
                `${baseApiUrl}/events/${event.id}`,
                event,
            );

            dispatch({
                type: "updated",
                payload: res.data,
            });
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteEvent(event: EventInput) {
        try {
            const res = await customAxios.delete(
                `${baseApiUrl}/events/${event.id}`,
            );

            console.log(res.data);

            dispatch({
                type: "deleted",
                payload: event,
            });
        } catch (err) {
            console.error("Failed deleting event: ", err);
        }
    }

    const contextValue: ContextValue = {
        events,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
    };

    return (
        <EventsContext.Provider value={contextValue}>
            {children}
        </EventsContext.Provider>
    );
}
