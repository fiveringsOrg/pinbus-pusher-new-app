import { Modal, message } from "antd";
import { t } from "i18next";
import { CheckOutlined } from "@ant-design/icons";

export const modalSuccess = (title: string, message: string, navigate: any) => {
  Modal.confirm({
    title: title,
    icon: <CheckOutlined />,
    content: message,
    onOk() {},
    onCancel() {
      navigate("/operate");
    },
  });
};

export const modalError = (title: string, content: string, navigate: any) => {
  Modal.error({
    title: title,
    content: content,
    onOk() {},
    onCancel() {
      navigate("/operate");
    },
  });
};

export const modelWarning = (title: string, content: string, navigate: any) => {
  Modal.warning({
    title: title,
    content: content,
    onOk() {},
    onCancel() {
      navigate("/operate");
    },
  });
};

export const messageSuccess = (content: string) => {
  message.open({
    type: "success",
    content: content ? content : t("success"),
  });
};

export const messageError = (content: string) => {
  message.open({
    type: "error",
    content: content ? content : t("error"),
  });
};

export const messageWarning = (content: string) => {
  message.open({
    type: "warning",
    content: content ? content : t("warning"),
  });
};
