import type { FC } from "react";
import "./LineAssignModal.css";
import {
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import "./TrainControlModal.css";
import type { Line } from "../../types/basic";

type TrainControlModalProps = {
  lines: Line[];
};

export const TrainControlModal: FC<TrainControlModalProps> = (props) => {
  const { lines } = props;
  return (
    <div className="trainControlModal">
      <div id="modalTitle">
        <h3>열차 컨트롤 모달</h3>
        <XCircleIcon alt="취소" />
      </div>
      <div id="content">
        <div className="setRow">
          <span>열차 배차하기</span>
          <div className="iconSet">
            <MinusIcon />
            <span>{lines.length}</span>
            <PlusIcon />
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="btnBox">
          <CheckCircleIcon alt="확인" onClick={() => {}} />
          <XCircleIcon onClick={() => {}} alt="취소" />
        </div>
      </div>
    </div>
  );
};
