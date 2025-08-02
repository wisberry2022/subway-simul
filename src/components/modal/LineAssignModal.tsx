import { useState, type FC } from "react";
import { useGameUIStore } from "../../states/useGameUIStore";
import { BottomModal } from "./BottomModal";
import type { NavPositionType, NavSize } from "../../types/ui";
import { createPortal } from "react-dom";
import { useGameStore } from "../../states/useGameStore";
import "./LineAssignModal.css";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

export const LineAssignModal: FC = () => {
  const { state, onClose } = useGameUIStore();
  const { lines, addTrainToLines, clearTool } = useGameStore();
  const modalRoot = document.getElementById("modalRoot");
  const [selected, setSelected] = useState<string[]>([]);

  if (!modalRoot) {
    return null;
  }

  const cleanUp = () => {
    clearTool();
    setSelected([]);
  };

  // 모달 종료 함수
  const onCloseModal = () => {
    onClose();
    cleanUp();
  };

  // 노선 선택 클릭 함수
  const onClick = (lineId: string) => {
    setSelected((prev) => {
      if (prev.includes(lineId)) {
        return prev.filter((id) => id !== lineId);
      }
      return prev.concat(lineId);
    });
  };

  // 확인 버튼 클릭 함수
  const onConfirm = () => {
    addTrainToLines(selected);
    onCloseModal();
  };

  return createPortal(
    <BottomModal
      size={state.size as NavSize}
      position={state.position as NavPositionType}
    >
      <div className="content">
        <div className="lineBox">
          {lines.map((line) => {
            return (
              <div
                key={line.id}
                onClick={() => onClick(line.id)}
                className="lineInfo"
              >
                <strong
                  className={`${selected.includes(line.id) ? "selected" : ""}`}
                >
                  {line.name}
                </strong>
                <div
                  className="line"
                  style={{ border: `0.1rem solid ${line.color}` }}
                />
              </div>
            );
          })}
        </div>
        <div className="buttonBox">
          <CheckCircleIcon alt="노선 제작 완료하기" onClick={onConfirm} />
          <XCircleIcon onClick={onCloseModal} alt="취소" />
        </div>
      </div>
    </BottomModal>,
    modalRoot
  );
};
