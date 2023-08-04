import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/Home";
import EventCalendar from "./pages/EventCalendar";

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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

//const homepage = (
//<div className="container">
//  <EventCalendar />
//</div>
//  <div className="row">
//    <div className="col-12 col-lg mb-3">
//      <Notes initialNotes={initalNotes} />
//    </div>
//    <div className="col-12 col-lg">
//      <FilteredContact initialContacts={initialContacts} />
//    </div>
//  </div>
//);

export default App;
