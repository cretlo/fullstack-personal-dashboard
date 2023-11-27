import { createContext, useContext, useReducer } from "react";
import { alertReducer } from "../reducers/alertReducer";
import type { AlertData } from "../types";

interface AlertContextType {
    alerts: AlertData[];
    setAlert: (message: string, type: string) => void;
}

const initialContextValue: AlertContextType = {
    alerts: [],
    setAlert: () => {
        console.log("Default setAlert context value");
    },
};

const AlertContext = createContext<AlertContextType>(initialContextValue);

export function useAlertContext() {
    const alertContext = useContext(AlertContext);

    if (!alertContext) {
        throw new Error(
            "useAlertContext has to be used within <Alert.Provider>",
        );
    }

    return alertContext;
}

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

    const contextValue = {
        alerts,
        setAlert,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
}
