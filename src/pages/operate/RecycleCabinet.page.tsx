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
import {
  cleanToken,
  cleanUser,
  getStorageUser,
} from "../../utils/storage.util";
import { useNavigate } from "react-router-dom";
import { MerchantSearchInput } from "../../components/MerchantSearchInput";
import { deployCabinet, recycleCabinet } from "../../api/pusher.api";
import { checkHeathWorker } from "../../api/login.api";
import {
  messageWarning,
  modalSuccess,
  messageError,
} from "../../utils/notice.util";

export const RecycleCabinet: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "recycle-cabinet" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [cabinet, setCabinet] = React.useState<string>();
  const [reason, setReason] = React.useState<string>();
  const [playFlag, setPlayFlag] = React.useState<string>();

  const cleanCaches = () => {
    setCabinet(undefined);
    setPlayFlag(undefined);
    setReason(undefined);
  };

  const onRecycleCabinet = () => {
    setIsLogin(false);
    if (
      reason == null ||
      cabinet == null ||
      playFlag == null ||
      reason === undefined ||
      cabinet === undefined ||
      playFlag === undefined
    ) {
      messageWarning(t("validate"));
      setIsLogin(true);
      return;
    }
    recycleCabinet(cabinet, reason, playFlag)
      .then((response) => {
        if (response && response.status === 200) {
          modalSuccess(t("success"), t("continue-recycle"), navigate);
        } else if (response.status === 500) {
          messageError(response.data.message.toString().substring(0, 30));
        } else {
          messageWarning(t("warning"));
        }
        cleanCaches();
        setIsLogin(true);
      })
      .catch((err) => {
        messageError(err?.response?.data?.message.toString().substring(0, 30));
        cleanCaches();
        setIsLogin(true);
      });
  };

  const onQrScanner = () => {
    setCabinet(undefined);
    setIsScanner(true);
    videoRef.hidden = false;
    qrScanner?.start();
  };

  React.useEffect(() => {
    document.title = t("title");
  }, [t]);

  React.useEffect(() => {
    if (cabinet) {
      qrScanner?.stop();
    }
  }, [cabinet]);

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

  const prepareScanQrCode = () => {
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
              videoRef.hidden = true;
              qrScanner?.stop();
            }
          },
          {
            /* your options or returnDetailedScanResult: true if you're not specifying any other options */
            highlightScanRegion: true,
          }
        )
      );
    }
  };

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
              qrScanner?.stop();
            }
          },
          {
            /* your options or returnDetailedScanResult: true if you're not specifying any other options */
            highlightScanRegion: true,
          }
        )
      );
    }
  }, [videoRef]);

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
                initialValues={{
                  reason: reason,
                  cabinet: cabinet,
                  playFlag: playFlag,
                }}
              >
                <Form.Item
                  label={t("cabinet").toString()}
                  name={t("cabinet").toString()}
                  rules={[
                    {
                      required: true,
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
                            onClick={() => onQrScanner()}
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
                      required: true,
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
                        label: t("adjust"),
                      },
                      {
                        value: "03802",
                        label: t("fault"),
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label={t("reject-powerbank").toString()}
                  name={t("reject-powerbank").toString()}
                  rules={[
                    {
                      required: true,
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
                        label: t("true"),
                      },
                      {
                        value: "00202",
                        label: t("false"),
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
                      onClick={() => onRecycleCabinet()}
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
      <div>
        {isScanner && (
          <div
            style={{
              padding: "8px 8px 8px 8px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LeftOutlined
              onClick={() => {
                setIsScanner(false);
                qrScanner?.stop();
              }}
            />
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
        )}
        <video
          id="qr-video"
          style={{
            width: "100vw",
          }}
          hidden={false}
        ></video>
      </div>
    </div>
  );
};
