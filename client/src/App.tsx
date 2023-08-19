import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AxiosProvider } from "./contexts/AxiosContext";
import { AlertProvider } from "./contexts/AlertContext";
import Alerts from "./components/Alerts";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventCalendar from "./pages/EventCalendar";

import "bootstrap/dist/css/bootstrap.min.css";
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
        <AxiosProvider>
          <AlertProvider>
            <BrowserRouter>
              <AppNavbar />
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="calendar" element={<EventCalendar />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
            <Alerts />
          </AlertProvider>
        </AxiosProvider>
      </AuthProvider>
    </>
  );
}

export default App;
