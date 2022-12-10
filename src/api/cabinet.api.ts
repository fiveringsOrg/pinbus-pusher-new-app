import { HOST } from "../app.constants";

import axios from "axios";

const API_URL = HOST + "/api/cabinet/mobile";

export function readStatus(deviceCode: string) {
  return axios.post(`${API_URL}/readStatus?deviceCode=${deviceCode}`);
}

export function queryByDeviceCode(deviceCode: string) {
  return axios.post(`${API_URL}/queryByDeviceCode?deviceCode=${deviceCode}`);
}
