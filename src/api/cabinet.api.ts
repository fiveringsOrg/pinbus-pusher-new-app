import { HOST } from "../app.constants";

import axios from "axios";

const API_URL = HOST + "/api/cabinet";
const API_URL_MOBILE = HOST + "/api/cabinet/mobile";
const API_URL_V2 = HOST + "/api/v2/cabinet";

export function readStatus(deviceCode: string) {
  return axios.post(`${API_URL_MOBILE}/readStatus?deviceCode=${deviceCode}`);
}

export function queryByDeviceCode(deviceCode: string) {
  return axios.post(
    `${API_URL_MOBILE}/queryByDeviceCode?deviceCode=${deviceCode}`
  );
}

export function queryById(id: string) {
  return axios.post(`${API_URL}/queryById?id=${id}`);
}

export function ejectSlotV2(
  cabinetId: number,
  cabinetSlotId: number,
  chargeable: boolean
) {
  return axios.post(
    `${API_URL_V2}/ejectSlotV2?cabinetId=${cabinetId}&cabinetSlotId=${cabinetSlotId}&chargeable=${chargeable}`
  );
}
