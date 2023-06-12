import { HOST } from "../app.constants";

import http from "../utils/axiosInstance";

const LOGIN_API_URL = HOST + "/login";
const LOGOUT_API_URL = HOST + "/logout";
const GET_USER_API_URL = HOST + "/api/getUser";
const CHECK_HEATH_API_URL = HOST + "/api/worker/checkHeathWorker";

export function login(username: string, password: string, agentCode: any) {
  return http.post(LOGIN_API_URL, {
    loginType: "21",
    username: username,
    password: password,
    agentCode: agentCode,
  });
}

export function checkHeathWorker() {
  return http.post(CHECK_HEATH_API_URL);
}

export function logout() {
  return http.post(LOGOUT_API_URL);
}

export function getUser() {
  return http.post(GET_USER_API_URL);
}
