import {
  HddOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/login.api";
import { CustomUserDetail } from "../../models/user.model";
import {
  cleanToken,
  cleanUser,
  getStorageUser,
} from "../../utils/storage.util";

export const Operate: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "operate" });
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<CustomUserDetail>();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = t("title");
  }, [t]);

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
        <Skeleton loading={loading}>
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
              <HddOutlined style={{ marginRight: "6px" }} />
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
