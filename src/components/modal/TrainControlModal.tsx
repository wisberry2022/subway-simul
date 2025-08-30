import { useState, type FC } from "react";
import "./LineAssignModal.css";
import {
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import "./TrainControlModal.css";
import type { Line, Train } from "../../types/basic";

type TrainControlModalProps = {
  open: boolean;
  onClose: () => void;
  trains: Train[];
  onConfirm: (quantity: number) => void;
};

export const TrainControlModal: FC<TrainControlModalProps> = (props) => {
  const { open, onClose, trains, onConfirm } = props;
  const [count, setCount] = useState(trains.length);

  const increaseTrain = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseTrain = () => {
    if (count - 1 < 0) {
      return;
    }
    setCount((prev) => prev - 1);
  };

  return (
    open && (
      <div className="trainControlModal">
        <div id="modalTitle">
          <h3>열차 컨트롤 모달</h3>
          <XCircleIcon alt="취소" onClick={onClose} />
        </div>
        <div id="content">
          <div className="setRow">
            <span>열차 배차하기</span>
            <div className="iconSet">
              <MinusIcon onClick={decreaseTrain} />
              <span>{count}</span>
              <PlusIcon onClick={increaseTrain} />
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="btnBox">
            <CheckCircleIcon alt="확인" onClick={() => onConfirm(count)} />
            <XCircleIcon onClick={onClose} alt="취소" />
          </div>
        </div>
      </div>
    )
  );
};
