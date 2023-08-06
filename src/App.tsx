import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/Home";
import EventCalendar from "./pages/EventCalendar";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
