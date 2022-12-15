import axios from "axios";
import { HOST } from "../app.constants";

const API_URL = HOST + "/api/pusher/mobile";

export function queryDeviceCountStatis() {
  return axios.post(API_URL + `/queryDeviceCountStatis`);
}

export function queryLastSevenDaysDailyStatis() {
  return axios.post(API_URL + `/queryLastSevenDaysDailyStatis`);
}

export function deployCabinet(deployDto: any, playFlag: any) {
  return axios.post(API_URL + `/deployCabinet`, deployDto, {
    params: {
      playFlag: playFlag,
    },
  });
}

export function deployPowerbank(deviceCode: any, snList: any[]) {
  return axios.post(
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
  return axios.post(
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
  return axios.post(
    API_URL + `/recycleCabinet`,
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
  return axios.post(
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
  return axios.post(API_URL + `/registerMerchant`, {
    model: merchant,
    merchantImageList: merchantImageList,
  });
}

export function getBillingRules(merchantId: any) {
  return axios.post(`${API_URL}/getBillingRules?merchantId=${merchantId}`);
}

export function saveBillingRules(billingRules: any) {
  return axios.post(`${API_URL}/saveBillingRules`, {
    model: billingRules,
  });
}

export function queryWorkProduct() {
  return axios.post(`${API_URL}/queryWorkProduct`);
}

export function updatePassword(oldPassword: any, newPassword: any) {
  return axios.post(
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
