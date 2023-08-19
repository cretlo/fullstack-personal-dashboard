import { useEffect, createContext, useReducer, useContext } from "react";
import authReducer from "../reducers/authReducer";
import { AuthState, LoginUser, RegisterUser } from "../types";
import axios, { AxiosError } from "axios";

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
    user: null,
    isAuthenticated: null,
    isLoading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initialFetch = true;
    loadUser(initialFetch);
  }, []);

  // Load user
  async function loadUser(initialFetch?: boolean) {
    try {
      const res = await axios.get("/api/auth", { withCredentials: true });

      dispatch({
        type: "user_loaded",
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch({
          type: "auth_error",
          payload: initialFetch ? null : err.response?.data.message,
        });
      }
    }
  }

  // Register user
  async function register(formData: RegisterUser) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: "register_succeeded",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      if (err instanceof AxiosError) {
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
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: "login_succeeded",
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch({
          type: "login_failed",
          payload: err.response?.data.message,
        });
      }
    }
  }

  // Logout user
  function logout() {
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
