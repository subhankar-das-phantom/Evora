import axios from "axios";
import { API_BASE } from "./endpoints";
import { authStore } from "../store/authStore";
import { uiStore } from "../store/uiStore";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

let lastNetworkToastAt = 0;

api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const isConnectionRefused = !error?.response && error?.code === "ERR_NETWORK";
    const isTimeout = error?.code === "ECONNABORTED" || error?.code === "ERR_CANCELED";
    let message = error?.response?.data?.message || "Request failed";
    
    if (isConnectionRefused) {
      message = "Unable to connect to the server. Please check your internet connection or try again later.";
    } else if (isTimeout) {
      message = "Request timed out. Please try again.";
    } else if (error?.response?.data?.errors?.length) {
      const firstError = error.response.data.errors[0];
      message = `${firstError.path}: ${firstError.message}`;
    }

    if (status === 401) {
      authStore.getState().logout();
    }

    if (isConnectionRefused || isTimeout) {
      const now = Date.now();
      if (now - lastNetworkToastAt > 5000) {
        uiStore.getState().pushToast({
          type: "error",
          message
        });
        lastNetworkToastAt = now;
      }
    } else {
      uiStore.getState().pushToast({
        type: "error",
        message
      });
    }

    return Promise.reject(error);
  }
);

export const fetcher = async (url) => {
  const response = await api.get(url);
  return response.data?.data;
};
