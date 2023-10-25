import { createContext, useContext } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useAuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

interface AxiosContextType {
  customAxios: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextType | null>(null);
const { Provider } = AxiosContext;

export const useAxiosContext = () => {
  const axiosContext = useContext(AxiosContext);

  if (!axiosContext) {
    throw new Error(
      "useAxiosContext has to be used within <AxiosContext.Provider>",
    );
  }

  return axiosContext;
};

export const AxiosProvider = ({ children }: Props) => {
  const authContext = useAuthContext();
  const { logout } = authContext;

  const customAxios = axios.create();
  customAxios.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logout();
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
      if (error instanceof AxiosError) {
        logout();
      }

      return Promise.reject(error);
    },
  );

  return <Provider value={{ customAxios }}>{children}</Provider>;
};
