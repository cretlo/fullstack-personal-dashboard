import { createContext, useReducer, useEffect, useContext } from "react";
import { EventInput } from "@fullcalendar/core/index.js";
import { eventsReducer } from "../reducers/eventsReducer";
import { useAxiosContext } from "./AxiosContext";
import { AxiosError } from "axios";
import type { EventsState } from "../types";

interface ContextValue {
    state: EventsState;
    fetchEvents: () => Promise<void>;
    addEvent: (event: EventInput) => Promise<void>;
    updateEvent: (event: EventInput) => Promise<void>;
    deleteEvent: (event: EventInput) => Promise<void>;
    clearError: () => void;
}

export const EventsContext = createContext<ContextValue | null>(null);

export const useEventsContext = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error(
            "EventsContext must be used within an EventsContextProvider",
        );
    }
    return context;
};

export function EventsProvider({ children }: { children: React.ReactNode }) {
    const initialState: EventsState = {
        events: [],
        error: null,
    };

    const [state, dispatch] = useReducer(eventsReducer, initialState);
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

            if (!res) {
                throw new AxiosError("Error fetching all events");
            }

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
            if (err instanceof AxiosError) {
                console.error(err?.response?.data);
            } else {
                console.error(err);
            }
        }
    }

    async function deleteEvent(event: EventInput) {
        try {
            await customAxios.delete(`${baseApiUrl}/events/${event.id}`);

            dispatch({
                type: "deleted",
                payload: event,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                dispatch({
                    type: "errored",
                    payload: err?.response?.data.message,
                });
            } else {
                console.error(err);
            }
        }
    }

    function clearError() {
        dispatch({
            type: "clear_error",
        });
    }

    const contextValue = {
        state,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        clearError,
    };

    return (
        <EventsContext.Provider value={contextValue}>
            {children}
        </EventsContext.Provider>
    );
}
