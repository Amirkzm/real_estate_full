import React from "react";
import "./step.scss";

type StepProps = {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
};
const Step: React.FC<StepProps> = ({ title, children, isActive }) => {
  return (
    <div className={`stepItem ${isActive ? "activeStep" : ""}`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Step;
