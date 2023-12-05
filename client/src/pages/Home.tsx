import Notes from "../components/notes/Notes";
import Events from "../components/events/Events";
import Todos from "../components/todos/Todos";

import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    function handleWindowSizeChange() {
        const newIsMobile = window.innerWidth < 992;

        if (isMobile !== newIsMobile) {
            setIsMobile(newIsMobile);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, [isMobile]);

    return (
        <>
            {isMobile ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg mb-3">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item
                                    eventKey="0"
                                    className="border-0"
                                >
                                    <Accordion.Header>
                                        <h2>Upcoming Events</h2>
                                    </Accordion.Header>
                                    <Accordion.Body className="px-0">
                                        <Events />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        <div className="col-12 col-lgm mb-3">
                            <Accordion>
                                <Accordion.Item
                                    eventKey="1"
                                    className="border-0"
                                >
                                    <Accordion.Header>
                                        <h2>To-Dos</h2>
                                    </Accordion.Header>
                                    <Accordion.Body className="px-0">
                                        <Todos />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        <div className="col-12 col-lg">
                            <Accordion>
                                <Accordion.Item
                                    eventKey="2"
                                    className="border-0"
                                >
                                    <Accordion.Header>
                                        <h2>Notes</h2>
                                    </Accordion.Header>
                                    <Accordion.Body className="px-0">
                                        <Notes />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg mb-3">
                            <h2 className="mb-3">Upcoming Events</h2>
                            <Events />
                        </div>

                        <div className="col-12 col-lg mb-3">
                            <h2 className="mb-3">To-Dos</h2>
                            <Todos />
                        </div>

                        <div className="col-12 col-lg">
                            <h2 className="mb-3">Notes</h2>
                            <Notes />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
