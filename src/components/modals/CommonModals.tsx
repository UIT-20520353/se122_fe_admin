/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalFuncProps, ModalProps as AntdModalProps } from "antd";
import i18n from "../../config/i18n";
import { ReactNode } from "react";

interface ModalProps extends AntdModalProps, ModalFuncProps {
  icon?: ReactNode;
  content: ReactNode;
  title?: string;
  onOk?: any;
  onCancel?: any;
  okText?: string;
  cancelText?: string;
}

const showWarningModal = ({
  okText = i18n.t("button.ok"),
  ...rest
}: ModalProps) => {
  Modal.error({
    ...rest,
    okText,
    className: `base-modal base-modal--warning ${rest.className}`,
    centered: true,
    zIndex: 5001,
  });
};

const showErrorModal = ({
  okText = i18n.t("button.ok"),
  ...rest
}: ModalProps) => {
  Modal.error({
    ...rest,
    okText,
    className: `base-modal base-modal--error ${rest.className}`,
    centered: true,
    zIndex: 5001,
  });
};

const showInfoModal = ({
  okText = i18n.t("button.ok"),
  //   cancelText = i18n.t('button.cancel'),
  ...rest
}: ModalProps) => {
  Modal.info({
    ...rest,
    okText,
    className: `base-modal base-modal--info ${rest.className}`,
    centered: true,
    zIndex: 5001,
  });
};

const showSuccessModal = ({
  okText = i18n.t("button.ok"),
  ...rest
}: ModalProps) => {
  Modal.success({
    ...rest,
    okText,
    className: `base-modal base-modal--success ${rest.className}`,
    centered: true,
    zIndex: 5001,
  });
};

const showConfirmModal = ({
  okText = i18n.t("button.ok"),
  ...rest
}: ModalProps) => {
  Modal.confirm({
    ...rest,
    okText,
    className: `base-modal base-modal--confirm ${rest.className}`,
    centered: true,
    zIndex: 5001,
  });
};

export {
  showConfirmModal,
  showErrorModal,
  showInfoModal,
  showSuccessModal,
  showWarningModal,
};
