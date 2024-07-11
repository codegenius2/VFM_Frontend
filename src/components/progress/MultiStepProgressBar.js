import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FaCheck } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 15;
  } else if (page === 2) {
    stepPercentage = 35;
  }
  else if (page === 3) {
    stepPercentage = 55;
  }
  else if (page === 4) {
    stepPercentage = 75;
  }
  else if (page === 5) {
    stepPercentage = 95;
  }
  else if (page === 6) {
    stepPercentage = 100;
  }

  return (
    <div className="w-full pt-10">
      <ProgressBar percent={stepPercentage} width={300} >
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("1")}
            >
              {stepPercentage > 9 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("2")}
            >
              {stepPercentage > 29 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("3")}
            >
              {stepPercentage > 49 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("4")}
            >
              {stepPercentage > 69 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("5")}
            >
              {stepPercentage > 89 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              onClick={() => onPageNumberClick("6")}
            >
              {stepPercentage > 99 ? <FaCheck /> : <FaRegDotCircle />}
            </div>
          )}
        </Step>
      </ProgressBar>


    </div>
  );
};

export default MultiStepProgressBar;
