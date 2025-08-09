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
  const [selected, setSelected] = useState<string>("");

  if (!modalRoot) {
    return null;
  }

  const cleanUp = () => {
    clearTool();
    setSelected("");
  };

  // 모달 종료 함수
  const onCloseModal = () => {
    onClose();
    cleanUp();
  };

  // 노선 선택 클릭 함수
  const onClick = (lineId: string) => {
    if (selected === lineId) {
      setSelected("");
    } else {
      setSelected(lineId);
    }
  };

  // 확인 버튼 클릭 함수
  const onConfirm = () => {
    // addTrainToLines(selected);
    onCloseModal();
  };

  return createPortal(
    <BottomModal
      open={state.mode === "TRAIN"}
      size={state.size as NavSize}
      position={state.position as NavPositionType}
      title="열차 컨트롤 패널"
    >
      <>
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
                    className={`${selected == line.id ? "selected" : ""}`}
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
        {selected && (
          <div className="trainControlModal">
            <div id="modalTitle">
              <h3>열차 컨트롤 모달</h3>
              <XCircleIcon alt="취소" />
            </div>
            <div id="content">
              <div>
                <span>열차 배차하기</span>
              </div>
            </div>
          </div>
        )}
      </>
    </BottomModal>,
    modalRoot
  );
};
