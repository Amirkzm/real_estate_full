import React, { act, useState } from "react";
import "./progressbar.scss";

type ProgressbarProps = {
  activeStep: number;
  titles: string[];
};

const generateStepsClasses = (
  activeStep: number,
  currentStep: number,
  baseClassNames: string = "step"
): string => {
  let className = baseClassNames;
  if (activeStep === currentStep) {
    className += " active";
  }
  if (activeStep > currentStep) {
    className += " completed";
  }
  return className;
};

const Progressbar: React.FC<ProgressbarProps> = ({ activeStep, titles }) => {
  return (
    <div className="progressContainer">
      <ul className="progressbar">
        {titles.map((title, index) => (
          <li className={generateStepsClasses(activeStep, index)} key={index}>
            <span className="stepLabel">{title}</span>
            <span
              className={generateStepsClasses(activeStep, index, "stepCount")}
            >
              {index < activeStep ? "✔" : index}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Progressbar;
