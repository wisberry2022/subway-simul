import type { FC } from "react";
import { useGameUIStore } from "../../states/useGameUIStore";
import { BottomModal } from "./BottomModal";
import type { NavPositionType, NavSize } from "../../types/ui";
import { createPortal } from "react-dom";
import { useGameStore } from "../../states/useGameStore";

export const LineAssignModal: FC = () => {
  const { state, onClose } = useGameUIStore();
  const { lines, addTrainToLine, clearTool } = useGameStore();
  const modalRoot = document.getElementById("modalRoot");

  if (!modalRoot) {
    return null;
  }

  const onCloseModal = () => {
    onClose();
    clearTool();
  };

  const onClick = (lineId: string) => {
    addTrainToLine(lineId);
    onCloseModal();
  };

  return createPortal(
    <BottomModal
      size={state.size as NavSize}
      position={state.position as NavPositionType}
    >
      <div>
        {lines.map((line) => {
          return (
            <div key={line.id} onClick={() => onClick(line.id)}>
              {line.name}
            </div>
          );
        })}
      </div>
    </BottomModal>,
    modalRoot
  );
};
