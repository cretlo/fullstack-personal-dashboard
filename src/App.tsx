//import FilteredContact from "./components/FilteredContacts";
import Notes from "./components/Notes";
import "bootstrap/dist/css/bootstrap.min.css";

const initalNotes = [
  {
    id: 0,
    title: "First note",
    note: "This is a bunch of random text",
  },
  {
    id: 1,
    title: "Second note",
    note: "This is a bunch of random text",
  },
  {
    id: 2,
    title: "Third note",
    note: "This is a bunch of random text",
  },
];

//const initialContacts = [
//  {
//    id: 0,
//    name: "Dale Diddler",
//    phone: "307-555-5555",
//    email: "thedale@gmail.com",
//  },
//  {
//    id: 1,
//    name: "Tina Tickler",
//    phone: "307-555-5555",
//    email: "tinapower@gmail.com",
//  },
//  {
//    id: 2,
//    name: "Timothy Tamalie",
//    phone: "307-555-5555",
//    email: "timtim420@gmail.com",
//  },
//];

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg">
            <Notes initialNotes={initalNotes} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
