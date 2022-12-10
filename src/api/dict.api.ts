import { HOST } from "../app.constants";

import axios from "axios";

const API_URL = HOST + "/api/dictionary/mobile/getByParentCode";

export function getByParentCode(parentCode: any) {
  return axios.post(
    API_URL,
    {},
    {
      params: {
        parentCode: parentCode,
      },
    }
  );
}
