import type { FC, ReactNode } from "react";
import "./BottomModal.css";
import type { NavPositionType, NavSize } from "../../types/ui";

type BottomModalProps = {
  size: NavSize;
  position: NavPositionType;
  children: ReactNode;
};

export const BottomModal: FC<BottomModalProps> = (props) => {
  const { children, position, size } = props;

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
      {children}
    </div>
  );
};
