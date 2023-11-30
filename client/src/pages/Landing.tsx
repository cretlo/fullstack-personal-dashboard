import eventImg from "../assets/event.png";
import calendarImg from "../assets/calendar.png";
import notesAndModalImg from "../assets/notes_and_modal.png";
import todosImg from "../assets/todos.png";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <>
            <div className="container mb-5">
                <header className="mb-5 row align-items-center py-3 justify-content-center">
                    <div className="col-lg-6 text-center">
                        <h1 className="text-center display-3 mb-5 fw-bold">
                            Welcome to your{" "}
                            <span className="text-body-secondary text-decoration-underline">
                                personal planner
                            </span>
                        </h1>
                        <p className="display-6 mb-5">
                            A simple open source scheduling, note taking, and
                            to-do list app
                        </p>
                        <Link
                            to={"/register"}
                            className="btn btn-lg btn-dark link-light me-3"
                        >
                            Register Now
                        </Link>
                        <a
                            className="btn btn-lg btn-dark"
                            href="https://github.com/cretlo/fullstack-personal-dashboard"
                            target="_blank"
                        >
                            <BsGithub
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        </a>
                    </div>
                </header>
                <section className="mb-5">
                    <div className="row mb-5">
                        <h2 className="display-6 fw-medium mb-3">
                            Schedule Events
                        </h2>
                        <div className="col d-flex align-items-center mb-3">
                            <p className="lead">
                                Manage your upcoming events right from the
                                comfort of your personal dashboard.
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={eventImg}
                                alt="Upcoming events list which displays the title, description, and date/time of you events"
                            />
                        </div>
                    </div>
                    <div className="row flex-row-reverse mb-5">
                        <div className="col d-flex align-items-center mb-3">
                            <p className="lead">
                                Use the calendar view for a higher level
                                overview of your planned events.
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={calendarImg}
                                alt="Event calendar showing the events of the month with directional arrow buttons for seeking to different months"
                            />
                        </div>
                    </div>
                </section>
                <section className="mb-5">
                    <h2 className="display-6 fw-medium mb-3">Take Notes</h2>
                    <div className="row">
                        <div className="col d-flex align-items-center mb-3">
                            <p className="lead">
                                Create notes using the built in note editor for
                                a more robust note taking experience.
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={notesAndModalImg}
                                alt="A list of notes overlayed on top of the note modal that contains the title, buttons for formatting text, and the text body, followed by a save and cancel button"
                            />
                        </div>
                    </div>
                </section>
                <section className="mb-5">
                    <h2 className="display-6 fw-medium mb-3">Manage To-Dos</h2>
                    <div className="row flex-row-reverse">
                        <div className="col d-flex align-items-center mb-3">
                            <p className="lead">
                                Utilize the consice to-do section, organizing
                                what you need to do in color coordinated
                                catagories.
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={todosImg}
                                alt="The todo list input that has a native browser color picker, text input, and add todo button, followed by a filter section with a list of the colors in the todo list followed by the list of todos"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <footer className="bg-dark">
                <div className="container p-3">
                    <section className="d-flex justify-content-between align-items-center p-3">
                        <p className="text-white fw-bold">Useful Links</p>
                        <div className="d-flex gap-3">
                            <Link className="link-light" to={"/login"}>
                                Login
                            </Link>
                            <Link className="link-light" to={"/register"}>
                                Register
                            </Link>
                            <Link
                                className="link-light"
                                to={
                                    "https://github.com/cretlo/fullstack-personal-dashboard"
                                }
                            >
                                Github
                            </Link>
                        </div>
                    </section>
                    <section className="d-flex gap-3 justify-content-center align-items-center">
                        <p className="text-white">
                            Created by{" "}
                            <Link
                                className="link-light align-center"
                                to={"https://ianreimers.com"}
                            >
                                Ian Reimers
                            </Link>
                        </p>
                    </section>
                </div>
            </footer>
        </>
    );
}

export default Landing;
