import { HOST } from "../app.constants";

import http from "../utils/axiosInstance";
const API_URL = HOST + "/api/pusher/mobile";

export function pageQuery(
  pageIndex: any,
  pageSize: any,
  forDeploy: any,
  searchWord: any
) {
  return http.post(API_URL + `/pageQueryMerchant`, null, {
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
  return http.post(
    HOST +
      `/api/merchant/mobile/queryMerchantForDeploy?parentId=${parentId}&searchWord=${searchWord}&pNumber=${pNumber}&pSize=${pSize}`,
    null,
    {}
  );
}
