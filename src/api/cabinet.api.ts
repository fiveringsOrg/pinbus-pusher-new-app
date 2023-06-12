import { HOST } from "../app.constants";

import http from "../utils/axiosInstance";

const API_URL = HOST + "/api/cabinet";
const API_URL_MOBILE = HOST + "/api/cabinet/mobile";
const API_URL_V2 = HOST + "/api/v2/cabinet";

export function readStatus(deviceCode: string) {
  return http.post(`${API_URL_MOBILE}/readStatus?deviceCode=${deviceCode}`);
}

export function queryByDeviceCode(deviceCode: string) {
  return http.post(
    `${API_URL_MOBILE}/queryByDeviceCode?deviceCode=${deviceCode}`
  );
}

export function queryById(id: string) {
  return http.post(`${API_URL}/queryById?id=${id}`);
}

export function ejectSlotV2(
  cabinetId: number,
  cabinetSlotId: number,
  chargeable: boolean
) {
  return http.post(
    `${API_URL_V2}/ejectSlotV2?cabinetId=${cabinetId}&cabinetSlotId=${cabinetSlotId}&chargeable=${chargeable}`
  );
}
