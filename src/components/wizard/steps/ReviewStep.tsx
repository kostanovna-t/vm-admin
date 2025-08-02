import { useFormikContext } from "formik";
import React from "react";
import PenIcon from "../../../assets/pen.svg";
import "./ReviewStep.scss";

interface FormValues {
  name: string;
  cpu: string;
  ram: string;
  isVirtualized: boolean;
}

interface ReviewItemProps {
  label: string;
  value: string | number;
  units?: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ label, value, units }) => (
  <>
    <div className="cell label">{label}</div>
    <div className="cell value">{value} {units || ''}</div>
  </>
);

export default function ReviewStep(): React.JSX.Element {
  const { values } = useFormikContext<FormValues>();
  const { name, cpu, ram } = values;

  const handleGoBack = (): void => {
    const event = new CustomEvent('wizard-go-back');
    window.dispatchEvent(event);
  };

  return (
    <div className="review-step">
      <div className="table">
        <ReviewItem label="Name" value={name} />
        <ReviewItem label="CPU" value={cpu} />
        <ReviewItem label="RAM" value={ram} units="GB" />
        
        <div className="cell full-width">
          <button onClick={handleGoBack} className="pen-button" title="Edit">
            <PenIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
