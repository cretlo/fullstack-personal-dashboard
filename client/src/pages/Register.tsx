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
      <div className="row">
        <div className="card p-3 col-md-8 offset-md-3 col-lg-6 offset-lg-3">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                className="form-control"
                onChange={handleChange}
                value={username}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                value={password}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
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
    </div>
  );
};

export default Register;
