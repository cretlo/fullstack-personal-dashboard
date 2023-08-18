import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventsProvider } from "./contexts/EventsContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventCalendar from "./pages/EventCalendar";

import { AlertProvider } from "./contexts/AlertContext";
import Alerts from "./components/Alerts";
import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import PrivateRoute from "./components/PrivateRoute";

/*
 * USE BOOTSTRAP-ICONS INSTEAD
 * READ DOCS
 *
 * */

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <EventsProvider>
            <BrowserRouter>
              <AppNavbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <PrivateRoute>
                      <EventCalendar />
                    </PrivateRoute>
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
            <Alerts />
          </EventsProvider>
        </AlertProvider>
      </AuthProvider>
    </>
  );
}

export default App;
