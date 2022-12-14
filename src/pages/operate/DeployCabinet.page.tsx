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
import { deployCabinet } from "../../api/pusher.api";
import { checkHeathWorker } from "../../api/login.api";

export const DeployCabinet: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "deploy-cabinet" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [merchant, setMerchant] = React.useState<number>();
  const [cabinet, setCabinet] = React.useState<string>();

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

  const onMerchantChange = (merchantId: number) => {
    setMerchant(merchantId);
  };

  const onDeployCabinet = () => {
    if (merchant == null && cabinet == null) {
      warning(t("validate"));
      return;
    }
    deployCabinet({ merchantId: merchant, deviceCode: cabinet })
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

  //   React.useEffect(() => {
  //     if (navigator.mediaDevices.getUserMedia !== null) {
  //       const options = {
  //         video: true,
  //       };
  //       navigator.mediaDevices
  //         .getUserMedia(options)
  //         .then((stream) => {
  //           videoRef.srcObject = stream;
  //           videoRef.play();
  //         })
  //         .catch((err) => {
  //           console.log(`${err.name} : ${err.message}`);
  //         });
  //     }
  //   });

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
                  label={t("merchant").toString()}
                  name={t("merchant").toString()}
                  rules={[
                    {
                      required: false,
                      message: t("merchant-message").toString(),
                    },
                  ]}
                >
                  <MerchantSearchInput
                    placeholder={t("merchant-search")}
                    onMerchantChange={onMerchantChange}
                    style={{}}
                  />
                </Form.Item>
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

                <Form.Item>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      block
                      htmlType="submit"
                      onClick={() => onDeployCabinet()}
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
