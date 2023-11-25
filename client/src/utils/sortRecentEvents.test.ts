import sortRecentEvents from "./sortRecentEvents";
import { describe, expect, it } from "vitest";
import { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

const unsortedTestEvents: EventInput[] = [
    {
        id: "0",
        start: dayjs().add(7, "day").toDate(),
        end: undefined,
        allDay: false,
    },
    {
        id: "1",
        start: dayjs().add(6, "day").toDate(),
        end: undefined,
        allDay: false,
    },
];

const sortedTestEvents: EventInput[] = [
    {
        id: "1",
        start: dayjs().add(6, "day").toDate(),
        end: undefined,
        allDay: false,
    },
    {
        id: "0",
        start: dayjs().add(7, "day").toDate(),
        end: undefined,
        allDay: false,
    },
];

describe("#sortedRecentEvents", () => {
    it("return square of number", () => {
        expect(sortRecentEvents(unsortedTestEvents)).toStrictEqual(
            sortedTestEvents,
        );
    });
});
