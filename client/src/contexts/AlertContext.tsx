import { Dispatch, createContext, useContext, useReducer } from "react";
import { alertReducer, ACTIONTYPE } from "../reducers/alertReducer";
import { AlertData } from "../types";

interface AlertContextType {
  alerts: AlertData[];
  setAlert: (message: string, type: string) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);
export function useAlertContext() {
  const alertContext = useContext(AlertContext);

  if (!alertContext) {
    throw new Error("useAlertContext has to be used within <Alert.Provider>");
  }

  return alertContext;
}

export const AlertDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null,
);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const initialState: AlertData[] = [];

  const [alerts, dispatch] = useReducer(alertReducer, initialState);

  function setAlert(message: string, type: string) {
    const id = String(Math.floor(Math.random() * 1000));
    dispatch({
      type: "set_alert",
      payload: { message, type, id },
    });

    setTimeout(() => {
      dispatch({
        type: "remove_alert",
        payload: id,
      });
    }, 3000);
  }

  return (
    <AlertContext.Provider
      value={{
        alerts,
        setAlert,
      }}
    >
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  );
}
