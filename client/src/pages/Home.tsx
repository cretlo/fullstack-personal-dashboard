import Notes from "../components/notes/Notes";
//import FilteredContact from "../components/contact/FilteredContacts";
import Events from "../components/events/Events";
import Todos from "../components/todos/Todos";

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
                        <Todos />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
