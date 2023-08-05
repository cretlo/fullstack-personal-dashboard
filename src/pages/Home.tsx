import AppNavbar from "../components/AppNavbar";
import Notes from "../components/Notes";
import FilteredContact from "../components/contact/FilteredContacts";

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

const Home = () => {
  return (
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
  );
};

export default Home;
