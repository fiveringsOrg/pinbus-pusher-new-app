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

export function queryForDeploy(
  parentId: any,
  searchWord: any,
  pNumber: any,
  pSize: any
) {
  return axios.post(
    HOST +
      `/api/merchant/mobile/queryMerchantForDeploy?parentId=${parentId}&searchWord=${searchWord}&pNumber=${pNumber}&pSize=${pSize}`,
    null,
    {}
  );
}
