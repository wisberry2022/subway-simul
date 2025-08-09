import type { FC, ReactNode } from "react";
import "./BottomModal.css";
import type { NavPositionType, NavSize } from "../../types/ui";

type BottomModalProps = {
  open: boolean;
  size: NavSize;
  position: NavPositionType;
  children: ReactNode;
  title?: string;
};

export const BottomModal: FC<BottomModalProps> = (props) => {
  const { open, children, position, size, title = "" } = props;

  if (!open) {
    return;
  }

  const sizeMapper: Record<NavSize, number> = {
    sm: 30,
    md: 50,
    lg: 98,
  };

  return (
    <div
      style={{ width: `${sizeMapper[size]}%` }}
      className={`bottomModal ${position ? "open" : ""}`}
    >
      {title && (
        <div className="title">
          <h3>타이틀</h3>
        </div>
      )}

      {children}
    </div>
  );
};
