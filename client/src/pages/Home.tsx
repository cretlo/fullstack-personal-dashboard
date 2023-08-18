import Notes from "../components/notes/Notes";
import FilteredContact from "../components/contact/FilteredContacts";
import Events from "../components/events/Events";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg mb-3">
            <Events />
          </div>
          <div className="col-12 col-lg mb-3">
            <Notes />
          </div>
          <div className="col-12 col-lg">
            <FilteredContact />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
