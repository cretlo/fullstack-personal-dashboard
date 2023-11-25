import type { DateInput, EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

export function isPastEvent(event: EventInput) {
    let currDate = dayjs();
    let start;
    let end;

    if (event.end) {
        end = dayjs(event.end.toString());
        return end.isBefore(currDate);
    }

    if (event.start && event.allDay) {
        currDate = dayjs().startOf("day");

        start = dayjs(event.start.toString());
        return start.isBefore(currDate);
    } else if (event.start) {
        start = dayjs(event.start.toString());

        return start.isBefore(currDate);
    }

    return false;
}

export function getFullDateStr(event: EventInput): string {
    const nullDate = new Date(0);
    const startDate = dayjs(event.start?.toString() ?? nullDate);
    const endDate = dayjs(event.end?.toString() ?? nullDate);

    let startDateStr;
    let endDateStr;

    if (startDate.unix() === 0) {
        startDateStr = "Invalid Date";
    } else {
        startDateStr = event.allDay
            ? startDate.format("M/D/YYYY")
            : startDate.format("M/D/YYYY, h:mm a");
    }

    endDateStr = !endDate.unix() ? "" : " - " + endDate.format("M/D/YYYY");

    return startDateStr + endDateStr;
}

export function toDateTime(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DDTHH:mm:ss");
}

export function toDate(dateISOStr: DateInput | undefined) {
    if (!dateISOStr) return "";

    return dayjs(dateISOStr.toString()).format("YYYY-MM-DD");
}
