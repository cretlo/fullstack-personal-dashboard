import { AuthState } from "../types";

export type ACTIONTYPE =
  | { type: "register_succeeded"; payload: { token: string } }
  | { type: "login_succeeded"; payload: { token: string } }
  | { type: "register_failed"; payload: string }
  | { type: "auth_error"; payload: string }
  | { type: "login_failed"; payload?: string }
  | { type: "logout"; payload?: string }
  | { type: "user_loaded"; payload: { id: number; username: string } }
  | { type: "clear_state"; payload?: null }
  | { type: "clear_erros" };

export default function authReducer(
  state: AuthState,
  action: ACTIONTYPE,
): AuthState {
  switch (action.type) {
    case "login_succeeded":
    case "register_succeeded": {
      return {
        ...state,
        ...action.payload, // token
        isAuthenticated: true,
        isLoading: false,
      };
    }
    case "user_loaded": {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    }
    case "clear_state":
    case "auth_error":
    case "logout":
    case "login_failed":
    case "register_failed": {
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload ?? null,
      };
    }
    case "clear_erros": {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      throw new Error();
    }
  }
}
