import { HOST } from "../app.constants";
import http from "../utils/axiosInstance";

const DICTIONARY_API_URL = HOST + "/api/dictionary";

export function getDictionaryByCode(code: string) {
  return http.post(`${DICTIONARY_API_URL}/getByCode`, null, {
    params: {
      code: code,
    },
  });
}

export function getDictionaryByParentCode(code: string) {
  return http.post(`${DICTIONARY_API_URL}/getByParentCode`, null, {
    params: {
      parentCode: code,
    },
  });
}
