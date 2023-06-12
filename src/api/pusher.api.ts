import { HOST } from "../app.constants";
import http from "../utils/axiosInstance";

const API_URL = HOST + "/api/pusher/mobile";

export function queryDeviceCountStatis() {
  return http.post(API_URL + `/queryDeviceCountStatis`);
}

export function queryLastSevenDaysDailyStatis() {
  return http.post(API_URL + `/queryLastSevenDaysDailyStatis`);
}

export function deployCabinet(deployDto: any, playFlag: any) {
  return http.post(API_URL + `/deployCabinet`, deployDto, {
    params: {
      playFlag: playFlag,
    },
  });
}

export function deployPowerbank(deviceCode: any, snList: any[]) {
  return http.post(
    API_URL + `/deployPowerbank`,
    {},
    {
      params: {
        deviceCode: deviceCode,
        snList: snList.join(","),
      },
    }
  );
}

export function getPowerbankDeployStatus(deviceCode: any) {
  return http.post(
    API_URL + `/getPowerbankDeployStatus`,
    {},
    {
      params: {
        deviceCode: deviceCode,
      },
    }
  );
}

export function recycleCabinet(deviceCode: any, reason: any, playFlag: any) {
  return http.post(
    API_URL + `/recycleCabinetV2`,
    {},
    {
      params: {
        deviceCode: deviceCode,
        reason: reason,
        playFalg: playFlag,
      },
    }
  );
}

export function recyclePowerbank(
  deviceCode: any,
  powerbankId: any,
  slotNumber: any
) {
  return http.post(
    API_URL + `/recyclePowerbank`,
    {},
    {
      params: {
        deviceCode: deviceCode,
        powerbankId: powerbankId,
        slotNumber: slotNumber,
      },
    }
  );
}

export function registerMerchant(merchant: any, merchantImageList: any) {
  return http.post(API_URL + `/registerMerchant`, {
    model: merchant,
    merchantImageList: merchantImageList,
  });
}

export function getBillingRules(merchantId: any) {
  return http.post(`${API_URL}/getBillingRules?merchantId=${merchantId}`);
}

export function saveBillingRules(billingRules: any) {
  return http.post(`${API_URL}/saveBillingRules`, {
    model: billingRules,
  });
}

export function queryWorkProduct() {
  return http.post(`${API_URL}/queryWorkProduct`);
}

export function updatePassword(oldPassword: any, newPassword: any) {
  return http.post(
    `${API_URL}/updatePassword`,
    {},
    {
      params: {
        oldPassword,
        newPassword,
      },
    }
  );
}
