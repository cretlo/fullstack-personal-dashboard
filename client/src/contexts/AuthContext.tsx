import { useEffect, createContext, useReducer, useContext } from "react";
import authReducer from "../reducers/authReducer";
import { AuthState, LoginUser, RegisterUser } from "../types";
import axios, { AxiosError } from "axios";
import setAuthToken from "../utils/setAuthToken";

interface AuthContextType {
  state: AuthState;
  register: (formData: RegisterUser) => void;
  clearErrors: () => void;
  login: (formData: LoginUser) => void;
  logout: () => void;
  loadUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>",
    );
  }

  return authContext;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    isLoading: true,
    error: null,
  };

  useEffect(() => {
    if (initialState.token) {
      loadUser();
    } else {
      dispatch({
        type: "clear_state",
      });
    }
  }, []);

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  async function loadUser() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: "user_loaded",
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        localStorage.removeItem("token");
        dispatch({
          type: "auth_error",
          payload: err.response?.data.message,
        });
      }
    }
  }

  // Register user
  async function register(formData: RegisterUser) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      // localStorage.setItem() must be called outside the reducer
      // since it is a side effect, making the reducer unpure
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "register_succeeded",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      if (err instanceof AxiosError) {
        localStorage.removeItem("token");
        dispatch({
          type: "register_failed",
          payload: err.response?.data.message,
        });
      }
    }
  }

  // Login user
  async function login(formData: LoginUser) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "login_succeeded",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      if (err instanceof AxiosError) {
        localStorage.removeItem("token");
        dispatch({
          type: "login_failed",
          payload: err.response?.data.message,
        });
      }
    }
  }

  // Logout user
  function logout() {
    localStorage.removeItem("token");
    dispatch({
      type: "logout",
    });
  }

  // Clear errors
  function clearErrors() {
    dispatch({
      type: "clear_erros",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        register,
        clearErrors,
        login,
        loadUser,
        logout,
      }}
    >
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
}
