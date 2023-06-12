import {
  HddOutlined,
  LeftOutlined,
  MobileFilled,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Spin, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import QrScanner from "qr-scanner";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ejectSlotV2, queryById } from "../../api/cabinet.api";
import SelectDict from "../../components/Select/SelectDict";
import { messageWarning, modalSuccess } from "../../utils/notice.util";
import { getStorageUser } from "../../utils/storage.util";

export const RecyclePowerbank: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "recycle-powerbank" });
  const videoRef = document.getElementById("qr-video") as HTMLVideoElement;
  const [qrScanner, setQrScanner] = React.useState<QrScanner>();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [isScanner, setIsScanner] = React.useState(false);
  const [cabinet, setCabinet] = React.useState<string>();
  const [powerbankSlot, setPowerbankSlot] = React.useState<number>();
  const [reason, setReason] = React.useState<string>();
  const [playFlag, setPlayFlag] = React.useState<string>();
  const [cabinetSlotList, setCabinetSlotList] = React.useState<any[]>();

  const [isValidateCabinet, setIsValidateCabinet] =
    React.useState<boolean>(true);
  const [isValidateReason, setIsValidateReason] = React.useState<boolean>(true);
  const [isValidateRejectPowerbank, setIsValidateRejectPowerbank] =
    React.useState<boolean>(true);
  const [isValidatePowerbankSlot, setIsValidateRejectPowerbankSlot] =
    React.useState<boolean>(true);

  const cleanCaches = () => {
    setCabinet(undefined);
    setPlayFlag(undefined);
    setReason(undefined);
    setPowerbankSlot(undefined);
    setIsValidateCabinet(true);
    setIsValidateReason(true);
    setIsValidateRejectPowerbank(true);
    setIsValidateRejectPowerbankSlot(true);
    setCabinetSlotList(undefined);
  };

  const onRecyclePowerbank = () => {
    setIsLogin(false);
    if (
      reason == null ||
      cabinet == null ||
      powerbankSlot == null ||
      reason === undefined ||
      cabinet === undefined ||
      powerbankSlot === undefined
    ) {
      messageWarning(t("validate"));
      setIsLogin(true);
      return;
    }

    ejectSlotV2(Number(cabinet.slice(4)), Number(powerbankSlot), false)
      .then((response) => {
        modalSuccess(t("success"), t("continue-recycle"), navigate);
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

  React.useEffect(() => {
    if (cabinet) {
      queryById(cabinet.slice(4)).then((result: any) => {
        setCabinetSlotList(result.cabinetSlotList);
      });
    }
  }, [cabinet]);

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
              setIsValidateCabinet(false);
              setPlayFlag(undefined);
              setReason(undefined);
              setIsValidateReason(false);
              qrScanner?.stop();
            }
          },
          {
            highlightScanRegion: true,
          }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, isScanner]);

  React.useEffect(() => {
    if (getStorageUser()) {
      setIsLogin(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  React.useEffect(() => {
    if (cabinet) {
      qrScanner?.stop();
    } else {
      setIsValidateCabinet(true);
    }
  }, [cabinet]);

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
                  reason: reason ? reason : undefined,
                  cabinet: cabinet ? cabinet : undefined,
                  playFlag: playFlag ? playFlag : undefined,
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
                    disabled={true}
                    size="large"
                    defaultValue={cabinet}
                    value={cabinet}
                    onChange={(e) => {
                      if (e.target.value) {
                        setIsValidateReason(false);
                      } else {
                        setIsValidateReason(true);
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
                  label={t("reason").toString()}
                  name={t("reason").toString()}
                  rules={[
                    {
                      required: !isValidateReason,
                      message: t("reason-message").toString(),
                    },
                  ]}
                >
                  <SelectDict
                    disabled={isValidateReason}
                    parentCode="038"
                    onChange={(value: string | any) => {
                      if (value) {
                        setIsValidateRejectPowerbankSlot(false);
                      } else {
                        setIsValidateRejectPowerbankSlot(true);
                      }
                      setReason(value);
                    }}
                  />
                </Form.Item>

                {/* <Form.Item
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
                </Form.Item> */}

                <Form.Item
                  label={t("powerbank-slot").toString()}
                  name={t("powerbank-slot").toString()}
                  rules={[
                    {
                      required: !isValidatePowerbankSlot,
                      message: t("powerbank-slot-message").toString(),
                    },
                  ]}
                >
                  <Select
                    size="large"
                    value={powerbankSlot}
                    defaultValue={powerbankSlot}
                    disabled={isValidatePowerbankSlot}
                    allowClear
                    onChange={(value) => {
                      setPowerbankSlot(value);
                    }}
                    options={[
                      {
                        value: "1",
                        label: t("slot-1"),
                        disabled:
                          cabinetSlotList?.length === undefined
                            ? true
                            : cabinetSlotList[0].hasBattery === "00201"
                            ? false
                            : true,
                      },
                      {
                        value: "2",
                        label: t("slot-2"),
                        disabled:
                          cabinetSlotList === undefined
                            ? true
                            : cabinetSlotList[1].hasBattery === "00201"
                            ? false
                            : true,
                      },
                      {
                        value: "3",
                        label: t("slot-3"),
                        disabled:
                          cabinetSlotList === undefined
                            ? true
                            : cabinetSlotList[2].hasBattery === "00201"
                            ? false
                            : true,
                      },
                      {
                        value: "4",
                        label: t("slot-4"),
                        disabled:
                          cabinetSlotList === undefined
                            ? true
                            : cabinetSlotList[3].hasBattery === "00201"
                            ? false
                            : true,
                      },
                      {
                        value: "5",
                        label: t("slot-5"),
                        disabled:
                          cabinetSlotList === undefined
                            ? true
                            : cabinetSlotList[4].hasBattery === "00201"
                            ? false
                            : true,
                      },
                    ]}
                  />
                </Form.Item>

                {cabinetSlotList && (
                  <Space>
                    <MobileFilled
                      style={{
                        color:
                          cabinetSlotList[0].hasBattery === "00201"
                            ? "green"
                            : "red",
                        fontSize: "32px",
                      }}
                    />
                    <MobileFilled
                      style={{
                        color:
                          cabinetSlotList[1].hasBattery === "00201"
                            ? "green"
                            : "red",
                        fontSize: "32px",
                      }}
                    />
                    <MobileFilled
                      style={{
                        color:
                          cabinetSlotList[2].hasBattery === "00201"
                            ? "green"
                            : "red",
                        fontSize: "32px",
                      }}
                    />
                    <MobileFilled
                      style={{
                        color:
                          cabinetSlotList[3].hasBattery === "00201"
                            ? "green"
                            : "red",
                        fontSize: "32px",
                      }}
                    />
                    <MobileFilled
                      style={{
                        color:
                          cabinetSlotList[4].hasBattery === "00201"
                            ? "green"
                            : "red",
                        fontSize: "32px",
                      }}
                    />
                  </Space>
                )}

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
