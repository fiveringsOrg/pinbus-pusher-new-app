import { HOST } from "../app.constants";

import axios from "axios";
const API_URL = HOST + "/api/pusher/mobile";

export function pageQuery(
  pageIndex: any,
  pageSize: any,
  forDeploy: any,
  searchWord: any
) {
  return axios.post(API_URL + `/pageQueryMerchant`, null, {
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      forDeploy: forDeploy || false,
      searchWord: searchWord ? searchWord : "",
    },
  });
}
