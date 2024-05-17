import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { clearUserSession } from "~~/helpers/logout";

const BASEURL: string = "https://staging-api.Goborr.com/api/v1";
const token: any = process.client ? localStorage.getItem("userToken") : "";

export const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use(
  async (
    request: AxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig<any>> => {
    const token: any = process.client ? localStorage.getItem("userToken") : "";

    if (!token) {
      // window.location.replace(`${window.location.origin}/login`);
      throw new axios.Cancel("No token");
    }
    request.headers && (request.headers["Authorization"] = `Bearer ${token}`);
    return request as any;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      clearUserSession();
      // window.location.replace(`${window.location.origin}/login`);
      // Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export const axiosWithoutAuth = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});
