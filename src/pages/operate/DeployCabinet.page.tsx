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
import { deployCabinet } from "../../api/pusher.api";
import { checkHeathWorker } from "../../api/login.api";
import {
  messageError,
  messageSuccess,
  messageWarning,
  modalSuccess,
} from "../../utils/notice.util";
import { MerchantSearchTable } from "../../components/MerchantSearchTable";

export const DeployCabinet: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "deploy-cabinet" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [merchant, setMerchant] = React.useState<number>();
  const [cabinet, setCabinet] = React.useState<string>();
  const [isValidateCabinet, setIsValidateCabinet] =
    React.useState<boolean>(true);

  const [isValidateMerchant, setIsValidateMerchant] =
    React.useState<boolean>(true);

  const [isValidateRejectPowerbank, setIsValidateRejectPowerbank] =
    React.useState<boolean>(true);
  const [playFlag, setPlayFlag] = React.useState<string>();

  const cleanCaches = () => {
    setMerchant(undefined);
    setCabinet(undefined);
    setPlayFlag(undefined);
    setIsValidateCabinet(true);
    setIsValidateMerchant(true);
    setIsValidateRejectPowerbank(true);
  };

  const onMerchantChange = (merchantId: number) => {
    if (merchantId) {
      setIsValidateRejectPowerbank(false);
      setIsValidateMerchant(false);
    } else {
      setIsValidateRejectPowerbank(true);
      setIsValidateMerchant(true);
    }
    setMerchant(merchantId);
  };

  const onDeployCabinet = () => {
    setIsLogin(false);
    if (
      merchant == null ||
      cabinet == null ||
      playFlag == null ||
      merchant === undefined ||
      cabinet === undefined ||
      playFlag === undefined
    ) {
      messageWarning(t("validate"));
      setIsLogin(true);
      return;
    }
    deployCabinet({ merchantId: merchant, deviceCode: cabinet }, playFlag)
      .then((response) => {
        if (response && response.status === 200) {
          modalSuccess(t("success"), t("continue-deploy"), navigate);
        } else if (response && response.data.status === "ERROR") {
          messageError(t("deploying-error"));
        } else {
          messageWarning(t("warning"));
        }
        cleanCaches();
        setIsLogin(true);
      })
      .catch((err) => {
        messageError(t("deploying-error"));
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
              setIsValidateCabinet(false);
              setIsScanner(false);
              videoRef.hidden = true;

              setMerchant(undefined);
              setIsValidateMerchant(false);
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
    if (cabinet) {
      qrScanner?.stop();
      setIsValidateCabinet(false);
    } else {
      setIsValidateCabinet(true);
    }
  }, [cabinet]);

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
              padding: "24px 8px 24px 8px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LeftOutlined onClick={() => navigate("/operate")} />
            <Title
              level={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
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
                  cabinet: cabinet ? cabinet : undefined,
                  merchant: merchant ? merchant : undefined,
                }}
              >
                <Form.Item
                  label={t("cabinet").toString()}
                  name={t("cabinet").toString()}
                  rules={[
                    {
                      required: isValidateCabinet,
                      message: t("cabinet-message").toString(),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    value={cabinet}
                    defaultValue={cabinet}
                    allowClear
                    onChange={(e) => {
                      if (e.target.value) {
                        setIsValidateMerchant(false);
                      } else {
                        setIsValidateMerchant(true);
                      }
                      setCabinet(e.target.value);
                    }}
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
                </Form.Item>
                <Form.Item
                  label={t("merchant").toString()}
                  name={t("merchant").toString()}
                  rules={[
                    {
                      required: !isValidateMerchant,
                      message: t("merchant-message").toString(),
                    },
                  ]}
                >
                  <MerchantSearchInput
                    placeholder={t("merchant-search")}
                    onMerchantChange={onMerchantChange}
                    merchantId={Number(merchant)}
                    disabled={isValidateMerchant}
                    style={{}}
                  />
                </Form.Item>

                <Form.Item
                  label={t("reject-powerbank").toString()}
                  name={t("reject-powerbank").toString()}
                  rules={[
                    {
                      required: !isValidateRejectPowerbank,
                      message: t("reject-powerbank-message").toString(),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    value={playFlag}
                    defaultValue={playFlag}
                    disabled={isValidateRejectPowerbank}
                    allowClear
                    onChange={(value) => {
                      setPlayFlag(value);
                    }}
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

                {/* <Form.Item
                  label={t("merchant").toString()}
                  name={t("merchant").toString()}
                  rules={[
                    {
                      required: false,
                      message: t("merchant-message").toString(),
                    },
                  ]}
                >
                  <MerchantSearchTable />
                </Form.Item> */}

                <Form.Item
                  style={{
                    paddingTop: "50px",
                  }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      block
                      htmlType="submit"
                      onClick={() => {
                        onDeployCabinet();
                      }}
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
              padding: "24px 8px 24px 8px",
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
              level={4}
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
