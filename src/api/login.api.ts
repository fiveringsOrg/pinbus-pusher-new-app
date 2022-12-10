import { HOST } from "../app.constants";

import axios from "axios";

const LOGIN_API_URL = HOST + "/login";
const LOGOUT_API_URL = HOST + "/logout";
const GET_USER_API_URL = HOST + "/api/getUser";

export function login(username: any, password: any, agentCode: any) {
  return axios.post(LOGIN_API_URL, {
    loginType: "21",
    username: username,
    password: password,
    agentCode: agentCode,
  });
}

export function logout(username: any, password: any) {
  return axios.post(LOGOUT_API_URL);
}

export function getUser(user: any) {
  return axios.post(GET_USER_API_URL);
}
