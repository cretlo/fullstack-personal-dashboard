import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const authContext = useAuthContext();

  const { isAuthenticated } = authContext.state;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
