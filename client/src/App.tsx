import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsProvider } from "./contexts/EventsContext";

import Root from "./pages/Root";
import Home from "./pages/Home";
import EventCalendar from "./pages/EventCalendar";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "bootstrap/dist/css/bootstrap.min.css";

/*
 * USE BOOTSTRAP-ICONS INSTEAD
 * READ DOCS
 *
 * */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "calendar",
    element: <EventCalendar />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

function App() {
  return (
    <>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </>
  );
}

export default App;
