import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isShow: string;
  onClose: () => void;
}

const Alert = ({ children, isShow, onClose }: Props) => {
  return (
    <div
      className={`alert alert-warning alert-dismissible fade ${isShow}`}
      role="alert"
    >
      {children}
      <button
        onClick={onClose}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
