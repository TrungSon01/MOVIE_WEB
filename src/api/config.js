import axios from "axios";
import { store } from "../main";
import { hideLoading, showLoading } from "../redux/loadingSlice";
export const Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtMDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG0wODM0MUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsImFkbTA4MzQxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzQ1NjQxMTg5LCJleHAiOjE3NDU2NDQ3ODl9.5S-0VTYaeIyXaVXM37BlRc_pciaeI-NIFwxUvpaCR7I";

export const CYBER_TOKERN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA";

const userJson = localStorage.getItem("USER");
const userInfor = JSON.parse(userJson);
console.log(userInfor);

export const https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft: CYBER_TOKERN,
  },
});

// axios interceptor

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    console.log("Api đi");
    store.dispatch(showLoading());
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    console.log("Api về thành công");
    store.dispatch(hideLoading());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("Api về lỗi");
    store.dispatch(hideLoading());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
