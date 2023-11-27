import { createContext, useContext } from "react";
import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { useAuthContext } from "./AuthContext";
import { useAlertContext } from "./AlertContext";

interface Props {
    children: React.ReactNode;
}

interface AxiosContextType {
    customAxios: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextType | null>(null);
const { Provider } = AxiosContext;

export const AxiosProvider = ({ children }: Props) => {
    const { logout } = useAuthContext();
    const { setAlert } = useAlertContext();

    const customAxios = axios.create();

    customAxios.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error instanceof AxiosError) {
                // User session expired
                if (error.response?.status === 401) {
                    logout();
                    setAlert("Session Expired", "danger");
                    return Promise.resolve();
                }
            }

            return Promise.reject(error);
        },
    );

    // Needed to allow requests with credentials
    customAxios.interceptors.request.use(
        (req) => {
            req.withCredentials = true;
            return req;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    return <Provider value={{ customAxios }}>{children}</Provider>;
};

export const useAxiosContext = () => {
    const axiosContext = useContext(AxiosContext);

    if (!axiosContext) {
        throw new Error(
            "useAxiosContext has to be used within <AxiosContext.Provider>",
        );
    }

    return axiosContext;
};
