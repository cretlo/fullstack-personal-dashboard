import "bootstrap/dist/css/bootstrap.min.css";
import FilteredContact from "./components/FilteredContacts";

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

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg">
            <FilteredContact initialContacts={initialContacts} />
          </div>
          <div className="col-12 col-lg">
            <FilteredContact initialContacts={initialContacts} />
          </div>
          <div className="col-12 col-lg">
            <FilteredContact initialContacts={initialContacts} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
