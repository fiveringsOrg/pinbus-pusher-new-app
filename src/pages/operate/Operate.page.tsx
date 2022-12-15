import React, { FC } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  message,
  Avatar,
  Card,
  Skeleton,
  Divider,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { checkHeathWorker, getUser, logout } from "../../api/login.api";
import {
  cleanToken,
  cleanUser,
  getStorageUser,
  saveUser,
} from "../../utils/storage.util";
import Meta from "antd/es/card/Meta";
import { CustomUserDetail } from "../../models/user.model";
import {
  LogoutOutlined,
  RightOutlined,
  ShakeOutlined,
  HddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Operate: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "operate" });
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<CustomUserDetail>();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = t("title");
  }, [t]);

  React.useEffect(() => {
    checkHeathWorker()
      .then((response) => {
        if (response && response.data.status === "NORMAL") {
        } else if (response.status === 401) {
          cleanUser();
          cleanToken();
          navigate("/login");
        }
      })
      .catch((err) => {
        cleanUser();
        cleanToken();
        navigate("/login");
      });
  }, [navigate]);

  React.useEffect(() => {
    if (getStorageUser()) {
      setUser(JSON.parse(getStorageUser()) as CustomUserDetail);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  React.useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const signOut = () => {
    logout();
    cleanUser();
    cleanToken();
    navigate("/login");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div>
      <div
        style={{
          padding: "8px 8px 0px 8px",
          backgroundColor: "white",
          paddingTop: "24px",
        }}
      >
        {user && (
          <Skeleton loading={loading} avatar active>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      marginRight: "36px",
                    }}
                    size={50}
                    icon={<UserOutlined />}
                  />
                }
                title={
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: "6px",
                    }}
                  >
                    {user.name}
                  </div>
                }
                description={
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {user.phone}
                  </div>
                }
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "16px",
                }}
              />
              <Button icon={<LogoutOutlined />} onClick={() => signOut()} />
            </div>
          </Skeleton>
        )}
        <Divider />
      </div>
      <div
        style={{
          padding: "0px 8px 0px 8px",
          backgroundColor: "white",
        }}
      >
        <Divider
          style={{
            marginTop: "0px",
          }}
        />
        <Skeleton loading={loading}>
          <div
            onClick={() => navigate("/operate/deploy-cabinet")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <HddOutlined style={{ marginRight: "6px" }} />
              <Meta
                title={
                  <div
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("deploy-cabinet")}
                  </div>
                }
              />
            </div>
            <RightOutlined style={{ marginRight: "6px" }} />
          </div>
          <Divider />
        </Skeleton>
        <Skeleton loading={loading}>
          <div
            onClick={() => navigate("/operate/recycle-cabinet")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <HddOutlined style={{ marginRight: "6px" }} />
              <Meta
                title={
                  <div
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("recycle-cabinet")}
                  </div>
                }
              />
            </div>
            <RightOutlined style={{ marginRight: "6px" }} />
          </div>
          <Divider />
        </Skeleton>
        {/* <Skeleton loading={loading}>
          <div
            onClick={() => navigate("/operate/recycle-powerbank")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <ShakeOutlined style={{ marginRight: "6px" }} />
              <Meta
                title={
                  <div
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {t("recycle-powerbank")}
                  </div>
                }
              />
            </div>
            <RightOutlined style={{ marginRight: "6px" }} />
          </div>
          <Divider />
        </Skeleton>
        <Divider
          style={{
            marginBottom: "0px",
          }}
        /> */}
      </div>
    </div>
  );
};
