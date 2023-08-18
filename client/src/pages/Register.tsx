import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { RegisterUser } from "../types";
import { useNavigate } from "react-router-dom";

import { useAlertContext } from "../contexts/AlertContext";
import { useAuthContext } from "../contexts/AuthContext";

const Register = () => {
  const authContext = useAuthContext();
  const alertContext = useAlertContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, clearErrors } = authContext;
  const { error, isAuthenticated } = authContext.state;

  const { setAlert } = alertContext;

  const { username, email, password, confirmPassword } = user;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        username,
        email,
        password,
      });
    }
  }

  return (
    <div className="container">
      <div className="card p-3">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={username}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={handleChange}
              value={confirmPassword}
            />
          </div>
          <div className="d-grid">
            <input
              type="submit"
              className="btn btn-primary d-block"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
