import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

// URL of the backend REST web service
const apiUrl = "https://fast-citadel-45907.herokuapp.com";
// const apiUrl = "http://127.0.0.1:5000";

const apiEndpoint = apiUrl + "/login";
const tokenKey = "token";
const http = axios;

setJwt(getJwt());

// base directory of the app when loaded in heroku
axios.defaults.baseURL = "https://gentle-wave-56839.herokuapp.com";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const { identity } = jwtDecode(jwt);
    return identity;
  } catch (ex) {
    return null;
  }
}

function setJwt(jwt) {
  axios.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export async function login(email, password) {
  const payload = {
    email: email,
    password: password
  };

  const { data: jwt } = await http.post(apiEndpoint, payload);

  localStorage.setItem(tokenKey, jwt["access_token"]);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getApiUrl() {
  return apiUrl;
}

export function formatDate(inputDate) {
  if (!inputDate) return null;

  let date = new Date(inputDate);
  const momths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return `${momths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function isEmpty(obj) {
  if (obj === undefined || obj == null) return true;

  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getApiUrl,
  formatDate,
  isEmpty
};
