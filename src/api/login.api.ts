import { HOST } from "../app.constants";

import axios from "axios";

const LOGIN_API_URL = HOST + "/login";
const LOGOUT_API_URL = HOST + "/logout";
const GET_USER_API_URL = HOST + "/api/getUser";
const CHECK_HEATH_API_URL = HOST + "/api/worker/checkHeathWorker";

export function login(username: any, password: any, agentCode: any) {
  return axios.post(LOGIN_API_URL, {
    loginType: "21",
    username: username,
    password: password,
    agentCode: agentCode,
  });
}

export function checkHeathWorker() {
  return axios.post(CHECK_HEATH_API_URL);
}

export function logout() {
  return axios.post(LOGOUT_API_URL);
}

export function getUser() {
  return axios.post(GET_USER_API_URL);
}
