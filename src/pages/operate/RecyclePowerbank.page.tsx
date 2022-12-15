import React, { FC, LegacyRef } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  message,
  Spin,
  Tooltip,
  Select,
} from "antd";
import { QrcodeOutlined, LeftOutlined, HddOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import QrScanner from "qr-scanner";
import Title from "antd/es/typography/Title";
import { getStorageUser } from "../../utils/storage.util";
import { useNavigate } from "react-router-dom";
import { MerchantSearchInput } from "../../components/MerchantSearchInput";
import {
  deployCabinet,
  recycleCabinet,
  recyclePowerbank,
} from "../../api/pusher.api";

export const RecyclePowerbank: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "recycle-cabinet" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [cabinet, setCabinet] = React.useState<string>();
  const [reason, setReason] = React.useState<string>();
  const [playFlag, setPlayFlag] = React.useState<string>();

  const success = (content: string) => {
    message.open({
      type: "success",
      content: content ? content : t("success"),
    });
  };

  const error = (content: string) => {
    message.open({
      type: "error",
      content: content ? content : t("error"),
    });
  };

  const warning = (content: string) => {
    message.open({
      type: "warning",
      content: content ? content : t("warning"),
    });
  };

  const onRecyclePowerbank = () => {
    recyclePowerbank(cabinet, reason, playFlag)
      .then((response) => {
        if (response && response.status === 200) {
          success(t("success"));
        } else if (response && response.data.status === "ERROR") {
          error(response.data.message);
        } else {
          warning(t("warning"));
        }
      })
      .catch((err) => error(err));
  };

  React.useEffect(() => {
    document.title = t("title");
  }, [t]);

  React.useEffect(() => {
    if (videoRef) {
      setQrScanner(
        new QrScanner(
          videoRef,
          (result: any) => {
            if (result) {
              setCabinet(
                result.data.toString().replace("https://pinbus.com.vn/cb/", "")
              );
              setIsScanner(false);
            }
          },
          {
            /* your options or returnDetailedScanResult: true if you're not specifying any other options */
          }
        )
      );
    }
  }, [videoRef]);

  React.useEffect(() => {
    if (cabinet) {
      qrScanner?.stop();
    }
  }, [cabinet, qrScanner]);

  React.useEffect(() => {
    if (getStorageUser()) {
      setIsLogin(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {!isScanner && (
        <div>
          <div
            style={{
              padding: "8px 8px 8px 8px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LeftOutlined onClick={() => navigate("/operate")} />
            <Title
              level={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              {t("title")}
            </Title>
            <div style={{ width: "16px" }}></div>
          </div>
          <div style={{ padding: "10px" }}></div>
          <div
            style={{
              padding: "8px 8px 8px 8px",
              backgroundColor: "white",
              height: "100vh",
            }}
          >
            {!isLogin ? (
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
                  label={t("cabinet").toString()}
                  name={t("cabinet").toString()}
                  rules={[
                    {
                      required: false,
                      message: t("cabinet-message").toString(),
                    },
                  ]}
                >
                  <div>
                    <Input
                      size="large"
                      value={cabinet}
                      onChange={(e) => setCabinet(e.target.value)}
                      prefix={<HddOutlined />}
                      suffix={
                        <Tooltip>
                          <Button
                            icon={<QrcodeOutlined />}
                            onClick={() => {
                              setIsScanner(true);
                              qrScanner?.start();
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  label={t("reason").toString()}
                  name={t("reason").toString()}
                  rules={[
                    {
                      required: false,
                      message: t("reason-message").toString(),
                    },
                  ]}
                >
                  <Select
                    value={reason}
                    size="large"
                    onChange={(value) => setReason(value)}
                    options={[
                      {
                        value: "03801",
                        label: "Adjust",
                      },
                      {
                        value: "03802",
                        label: "Fault",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label={t("reject-powerbank").toString()}
                  name={t("reject-powerbank").toString()}
                  rules={[
                    {
                      required: false,
                      message: t("reject-powerbank-message").toString(),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    value={playFlag}
                    onChange={(value) => setPlayFlag(value)}
                    options={[
                      {
                        value: "00201",
                        label: "True",
                      },
                      {
                        value: "00202",
                        label: "False",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      block
                      htmlType="submit"
                      onClick={() => onRecyclePowerbank()}
                    >
                      {t("submit-button")}
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      )}
      <video
        id="qr-video"
        style={{
          width: "100vw",
        }}
        hidden={false}
      ></video>
    </div>
  );
};
