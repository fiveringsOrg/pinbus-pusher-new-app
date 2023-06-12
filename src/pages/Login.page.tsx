/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUser, login } from "../api/login.api";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../utils/notice.util";
import { saveToken, saveUser } from "../utils/storage.util";

export const Login: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "login" });
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAgent, setIsAgent] = React.useState(false);
  const [agentCode, setAgentCode] = React.useState(undefined);
  const [isLogin, setIsLogin] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const clearCaches = () => {
    setUsername("");
    setPassword("");
    setIsLogin(false);
  };

  const onLogin = () => {
    setIsLogin(true);
    if (username && password) {
      login(username, password, agentCode)
        .then((token: any) => {
          saveToken(token);
          messageSuccess(t("success"));
          getUser().then((user) => {
            if (user) {
              saveUser(JSON.stringify(user));
            }
          });
          setTimeout(() => {
            navigate("/operate");
          }, 1000);
        })
        .catch((e) => {
          messageError(e);
          clearCaches();
        });
    } else {
      clearCaches();
      messageWarning(t("warning"));
    }
  };

  React.useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <div>
      <div
        style={{
          padding: "8px 8px 8px 8px",
          backgroundColor: "white",
        }}
      >
        <Title
          level={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Pusher App Loging
        </Title>
      </div>
      <div style={{ padding: "10px" }}></div>
      <div
        style={{
          padding: "8px 8px 8px 8px",
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        {isLogin ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        ) : (
          <Form
            name="basic"
            className="login-form"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label={t("username").toString()}
              name={t("username").toString()}
              rules={[
                {
                  required: true,
                  message: t("username-message").toString(),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("username").toString()}
                size="large"
                allowClear
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={t("password").toString()}
              name={t("password").toString()}
              rules={[
                {
                  required: true,
                  message: t("password-message").toString(),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                allowClear
                autoComplete="on"
                placeholder={t("password").toString()}
                size="large"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("remember-me")}</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  type="primary"
                  block
                  onClick={() => onLogin()}
                  htmlType="submit"
                >
                  {t("login-button")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};
