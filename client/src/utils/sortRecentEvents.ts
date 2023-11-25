import { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

export default function sortRecentEvents(events: EventInput[]): EventInput[] {
    if (events.length == 0) {
        return [];
    }

    const filteredEvents = events.filter((event) => {
        const startDate = dayjs(event.start?.toString());
        const endDate = dayjs(event.end?.toString() ?? null);
        const today = dayjs();

        if (endDate.isValid()) {
            return endDate.isAfter(today.subtract(2, "days"));
        }

        return startDate.isAfter(today.subtract(2, "days"));
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
        const aStartDate = dayjs(a.start?.toString());
        const bStartDate = dayjs(b.start?.toString());

        if (aStartDate.isBefore(bStartDate)) {
            return -1;
        } else {
            return 1;
        }
    });

    return sortedEvents;
}
