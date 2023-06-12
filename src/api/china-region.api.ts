import { HOST } from "../app.constants";
import http from "../utils/axiosInstance";

const API_URL = HOST + "/api/chinaRegion/mobile";

export function getRegionDataByParentCode(parentCode: any) {
  let url = `${HOST}/api/chinaRegion/mobile/getByParentCode`;

  if (parentCode) {
    url += "?parentCode=";
    url += parentCode;
  }
  return new Promise((resolve, reject) => {
    http.post(url).then(
      (data: any) => {
        if (data && data.length > 0) {
          let list = data.map((d: any) => {
            return {
              value: d.model.code,
              label: d.model.name,
            };
          });

          resolve(list);
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export const getProvince = () => {
  return http.post(`${API_URL}/getProvince`);
};
