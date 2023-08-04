import AppNavbar from "./AppNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import bootstrap5 from "@fullcalendar/bootstrap5";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const EventCalendar = () => {
  function handleClick(arg: DateClickArg) {
    console.log(arg.dateStr);
  }

  function handleSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
  }

  return (
    <>
      <AppNavbar />
      <div className="container">
        <FullCalendar
          dateClick={handleClick}
          selectable={true}
          themeSystem="bootstrap5"
          select={handleSelect}
          plugins={[dayGridPlugin, interactionPlugin, bootstrap5]}
          initialView="dayGridMonth"
        />
      </div>
    </>
  );
};

export default EventCalendar;
