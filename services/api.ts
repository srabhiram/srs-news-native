import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_API, // ✅ Expo env
  timeout:15000,
  timeoutErrorMessage:"Netwrk fetch fail"
});
