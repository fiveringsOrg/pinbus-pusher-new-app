/* eslint-disable import/no-anonymous-default-export */
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Router from "./routes";

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
    <ToastContainer />
  </ConfigProvider>
);
