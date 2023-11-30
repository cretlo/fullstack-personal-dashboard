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
            navigate("/home");
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
            <div className="row">
                <div className="card p-3 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <h2 className="text-center">Login</h2>
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
                        <div className="d-grid">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
