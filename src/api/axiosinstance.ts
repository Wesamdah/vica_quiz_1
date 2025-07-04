import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const instance = axios.create({
  baseURL: "https://vica.website/api",
  allowAbsoluteUrls: true,
  transformRequest: [
    (data, headers) => {
      if (data instanceof FormData) {
        return data;
      } else {
        headers["Content-Type"] = "application/json";
        return JSON.stringify(data);
      }
    },
  ],
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as { msg?: string; message?: string };

      if (error.response.status === 400) {
        toast.error(data.msg || data.message);
      }
      if (error.response.status === 401) {
        toast.error(data.msg || data.message);
      }
      if (error.response.status === 422) {
        toast.error(data.message?.split(".")[0]);
      }
    } else if (error.request) {
      toast.error("No response received");
    } else {
      toast.error("error.message");
    }

    return Promise.reject(error);
  },
);
