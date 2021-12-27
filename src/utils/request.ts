import axios from "axios";
import { BASE_URL } from "@/config/index";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response: any) => {
    if (response.headers["content-type"] === "application/octet-stream") {
      // 返回为二进制流
      return response;
    }
    if (response.status !== 200) {
      // 返回错误
      return Promise.reject(response.message);
    }
    const { data = {} } = response;
    if (Object.prototype.hasOwnProperty.call(data, "code")) {
      const { code, message,desc } = data;
      if (code !== 200 && code !== 10000 && code !== 0) {
        return Promise.reject({code, message:message || desc});
      }
    }
    return data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export { request };
