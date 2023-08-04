import AppNavbar from "./components/AppNavbar";
import EventCalendar from "./components/EventCalendar";
import FilteredContact from "./components/FilteredContacts";
import Notes from "./components/Notes";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/Root";

const initalNotes = [
  {
    id: 0,
    title: "First note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
  {
    id: 1,
    title: "Second note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
  {
    id: 2,
    title: "Third note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
];

const initialContacts = [
  {
    id: 0,
    name: "Dale Diddler",
    phone: "307-555-5555",
    email: "thedale@gmail.com",
  },
  {
    id: 1,
    name: "Tina Tickler",
    phone: "307-555-5555",
    email: "tinapower@gmail.com",
  },
  {
    id: 2,
    name: "Timothy Tamalie",
    phone: "307-555-5555",
    email: "timtim420@gmail.com",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "home",
    element: (
      <>
        <AppNavbar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg mb-3">
              <Notes initialNotes={initalNotes} />
            </div>
            <div className="col-12 col-lg">
              <FilteredContact initialContacts={initialContacts} />
            </div>
          </div>
        </div>
      </>
    ),
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
