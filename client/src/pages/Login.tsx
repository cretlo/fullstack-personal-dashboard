import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useAlertContext } from "../contexts/AlertContext";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const authContext = useAuthContext();
  const alertContext = useAlertContext();
  const navigate = useNavigate();

  const { login, clearErrors } = authContext;
  const { isAuthenticated, error } = authContext.state;
  const { setAlert } = alertContext;
  const { username, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    login(user);
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
