import Axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

// import { API_PATH, API_URL } from '@/config';
// import { useNotificationStore } from '@/stores/notifications';
import { API_URL } from "src/config";
import cookie from "src/utils/cookie";

function authRequestInterceptor(config: AxiosRequestConfig): any {
  const token = cookie.getToken();
  if (token) {
    (config.headers as AxiosHeaders).set("authorization", `Bearer ${token}`);
  }

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    // useNotificationStore.getState().dismissAllNotification();
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   message,
    // });
    return Promise.reject(error);
  }
);
