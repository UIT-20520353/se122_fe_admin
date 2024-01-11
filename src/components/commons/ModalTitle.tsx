import React from "react";

interface ModalTitleProps {
  title: string;
}

const ModalTitle: React.FunctionComponent<ModalTitleProps> = ({ title }) => {
  return <span className="modal__title">{title}</span>;
};

export { ModalTitle };
