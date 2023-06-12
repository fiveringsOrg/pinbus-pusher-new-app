import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { translate } from ".";
import { ToastTopHelper } from "./notice.util";
import { cleanToken, getToken } from "./storage.util";

const http = axios.create();

http.defaults.timeout = 60 * 1000;

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = getToken();
    config.headers = {
      ...config.headers,
    };
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  async (response: AxiosResponse) => {
    let data = response.data;
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      let status = data.status;
      let message = data.message;
      let result = data.result;
      let code = data.code;
      if (code !== 401) {
        if (!data) {
          return null;
        }
        if (status === "ERROR") {
          ToastTopHelper.error(message);
        }
        if (result.status === "SUCCESS") {
          ToastTopHelper.success(result.result);
        }
        if (result.status === "FAIL") {
          ToastTopHelper.error(result.result);
        }

        if (!status) {
          return data;
        } else {
          if (status === "NORMAL") {
            if (message) {
              ToastTopHelper.success(message);
            }
            return result;
          } else if (status === "ERROR") {
            ToastTopHelper.error(message);
            return Promise.reject(message);
          } else {
            return Promise.reject(result);
          }
        }
      } else {
        cleanToken();
        return Promise.reject(data);
      }
    }
  },
  async (error) => {
    let response = error.response;
    handleErrorResponse(response);
  }
);

function handleErrorResponse(errorResponse: AxiosResponse | undefined) {
  switch (errorResponse?.status) {
    case 401:
      cleanToken();
      window.location.reload();
      return Promise.reject(errorResponse);
    case 403:
      break;
    case 404:
      ToastTopHelper.error(translate("system.serverDisable"));
      break;
    case 413:
      ToastTopHelper.error(translate("system.attachTooBig"));
      break;
    case 500:
      const responseError = errorResponse.data;
      if (responseError) {
        if (responseError instanceof Blob) {
          if (responseError.type === "application/json") {
            const reader = new FileReader();
            reader.onload = function () {
              const content = reader.result?.toString();
              if (content) {
                const obj = JSON.parse(content);
                ToastTopHelper.error(
                  translate("system.attachTooBig") + `\n ${obj.message}`
                );
              }
            };
            reader.readAsText(responseError);
          } else {
            ToastTopHelper.error(translate("system.attachTooBig"));
          }
        } else {
          let message = responseError.message;
          if (
            !message &&
            responseError.result &&
            responseError.result.message
          ) {
            message = responseError.result.message;
          }
          if (message) {
            ToastTopHelper.error(`${translate("system.sysTip")} :${message}`);
          } else {
            ToastTopHelper.error(translate("system.unknowError"));
          }
        }
      }
      break;
    default:
      if (errorResponse instanceof Error) {
        ToastTopHelper.error(
          `${translate("system.sysTip")} :${errorResponse.message}`
        );
      }
      break;
  }

  throw errorResponse;
}

export default http;
