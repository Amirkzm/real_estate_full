import React, { useEffect, useRef, useState } from "react";
import Step from "./Step";
import Progressbar from "./Progressbar";
import { Button } from "../button";
import "./multiStepForm.scss";

type MultiStepFormProps = {
  activeStep: number;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  backButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  theme?: React.CSSProperties["color"];
};

const MultiStepForm: React.FC<MultiStepFormProps> & { Step: typeof Step } = ({
  activeStep,
  onSubmit,
  onBack,
  onNext,
  children,
  backButton,
  nextButton,
  theme,
}) => {
  const [titles, setTitles] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(activeStep || 0);
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = titles.length;

  const nextButtonHandler = () => {
    console.log("nextButtonHandler");
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
    onNext && onNext();
  };

  const prevButtonHandler = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    onBack && onBack();
  };

  useEffect(() => {
    // Extract titles from children
    const extractedTitles = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.props.title) {
        return child.props.title;
      }
      return null;
    })?.filter((title): title is string => title !== null);

    setTitles(extractedTitles || []);
  }, [children]);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="multiStepForm">
      <Progressbar activeStep={currentStep} titles={titles} />
      <div className="stepContainer">
        <form onSubmit={onSubmit} ref={formRef}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === Step) {
              return React.cloneElement(child as React.ReactElement<any>, {
                isActive: index === currentStep,
              });
            }
            return child;
          })}
        </form>
      </div>
      <div className="btnContainer">
        {backButton ?? (
          <Button onClick={prevButtonHandler} disabled={currentStep === 0}>
            Back
          </Button>
        )}
        {currentStep < totalSteps - 1 && (
          <Button
            onClick={nextButtonHandler}
            disabled={currentStep === totalSteps - 1}
          >
            {currentStep === totalSteps - 1 ? "Submit" : "Next"}
          </Button>
        )}

        {currentStep === totalSteps - 1 && (
          <Button type="button" onClick={handleSubmitClick}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

MultiStepForm.Step = Step;

export default MultiStepForm;
