import {
  HddOutlined,
  LeftOutlined,
  QrcodeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Spin, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import QrScanner from "qr-scanner";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deployCabinet } from "../../api/pusher.api";
import { ToastTopHelper, messageWarning } from "../../utils/notice.util";
import { getStorageUser } from "../../utils/storage.util";
import { DataType, Merchant } from "../Merchant.page";

export const DeployCabinet: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "deploy-cabinet" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [merchant, setMerchant] = React.useState<DataType>();
  const [cabinet, setCabinet] = React.useState<string>();
  const [isValidateCabinet, setIsValidateCabinet] =
    React.useState<boolean>(true);

  const [isValidateMerchant, setIsValidateMerchant] =
    React.useState<boolean>(true);

  const [isValidateRejectPowerbank, setIsValidateRejectPowerbank] =
    React.useState<boolean>(true);
  const [playFlag, setPlayFlag] = React.useState<string>();
  const [open, setOpen] = React.useState<boolean>(false);

  const cleanCaches = () => {
    setMerchant(undefined);
    setCabinet(undefined);
    setPlayFlag(undefined);
    setIsValidateCabinet(true);
    setIsValidateMerchant(true);
    setIsValidateRejectPowerbank(true);
  };

  const showMerchantModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleSelectMerchant = (merchants: any[]) => {
    setMerchant(merchants[0]);
    setOpen(false);
    if (merchants.length > 0) {
      setIsValidateRejectPowerbank(false);
    } else {
      setIsValidateRejectPowerbank(true);
    }
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
    deployCabinet({ merchantId: merchant.id, deviceCode: cabinet }, playFlag)
      .then((response) => {
        cleanCaches();
        ToastTopHelper.success(t("success"));
        setIsLogin(true);
      })
      .catch((err) => {
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
                name="deploy-cabinet"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 16 }}
                initialValues={{
                  cabinet: cabinet,
                  merchant: merchant?.name,
                  playFlag: playFlag,
                }}
              >
                <Form.Item
                  label={t("cabinet").toString()}
                  name="cabinet"
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
                  name="merchant"
                  rules={[
                    {
                      required: !isValidateMerchant,
                      message: t("merchant-message").toString(),
                    },
                  ]}
                >
                  {/* <MerchantSearchInput
                    placeholder={t("merchant-search")}
                    onMerchantChange={onMerchantChange}
                    merchantId={Number(merchant)}
                    disabled={isValidateMerchant}
                    style={{ width: "100%" }}
                  /> */}
                  <Input
                    size="large"
                    value={merchant ? merchant.name : ""}
                    disabled={true}
                    allowClear
                    suffix={
                      <Tooltip>
                        <Button
                          disabled={isValidateMerchant}
                          icon={<TeamOutlined />}
                          onClick={() => showMerchantModal()}
                        />
                      </Tooltip>
                    }
                  />
                  <Merchant
                    open={open}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    handleSelectMerchant={handleSelectMerchant}
                    pNumber={1}
                    pSize={10}
                  />
                </Form.Item>

                <Form.Item
                  label={t("reject-powerbank").toString()}
                  name="playFlag"
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
