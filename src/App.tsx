/* eslint-disable import/no-anonymous-default-export */
import React, { FC } from "react";
import { ConfigProvider } from "antd";
import axios from "axios";
import { getToken } from "./utils/storage.util";
import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

//Config default for axios
let token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
axios.defaults.headers.post["Content-Type"] = "application/json";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
      },
    }}
  >
    <App />
  </ConfigProvider>
);
