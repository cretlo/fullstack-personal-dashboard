import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AxiosProvider } from "./contexts/AxiosContext";
import { AlertProvider } from "./contexts/AlertContext";
import Alerts from "./components/Alerts";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventCalendar from "./pages/EventCalendar";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/main.scss";
import AppNavbar from "./components/AppNavbar";
import PrivateRoute from "./components/PrivateRoute";

/*
 * USE BOOTSTRAP-ICONS INSTEAD
 * READ DOCS
 *
 * */

function App() {
    return (
        <>
            <AuthProvider>
                <AlertProvider>
                    <AxiosProvider>
                        <BrowserRouter>
                            <AppNavbar />
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="/" element={<PrivateRoute />}>
                                    <Route path="home" element={<Home />} />
                                    <Route
                                        path="calendar"
                                        element={<EventCalendar />}
                                    />
                                </Route>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </BrowserRouter>
                        <Alerts />
                    </AxiosProvider>
                </AlertProvider>
            </AuthProvider>
        </>
    );
}

export default App;
