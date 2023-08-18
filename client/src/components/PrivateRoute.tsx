import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { EventsProvider } from "../contexts/EventsContext";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authContext = useAuthContext();

  const { isAuthenticated } = authContext.state;

  return isAuthenticated ? (
    <EventsProvider>
      <Outlet />
    </EventsProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
