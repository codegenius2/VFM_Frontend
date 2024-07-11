import React, { useState, useEffect } from "react";
import MultiStepProgressBar from "./MultiStepProgressBar";
import SuccessModal from "../common/modal/success";


const VFMProgress = ({ values }) => {
  const [page, setPage] = useState("1");
  const [isOpen, setIsOpen] = useState(false);

  const nextPageNumber = (values) => {

    switch (values) {
      case 1:
        setIsOpen(false);
        setPage(1);
        break;
      case 2:
        setIsOpen(false);
        setPage(2);
        break;
      case 3:
        setIsOpen(false);
        setPage(3);
        break;
      case 4:
        setIsOpen(false);
        setPage(4);
        break;
      case 5:
        setIsOpen(false);
        setPage(5);
        break;
      case 6:
        setIsOpen(true);
        setPage(6);
        break;
      default:
        setPage(1);
    }
  };

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    nextPageNumber(values)
  }, [values])

  return (
    <>
      <div className="w-full">
        <MultiStepProgressBar page={values} onPageNumberClick={nextPageNumber} />
      </div>
      <div className="flex flex-row gap-7 justify-center mb-5">
        <span>相談</span>
        <span>応募</span>
        <span>契約</span>
        <span>納品</span>
        <span>検収</span>
        <span>完了</span>
      </div>
      <SuccessModal open={isOpen}
        onCancel={handleClose}
        title="取引が完了しました。" />
    </>
  );
}

export default VFMProgress;
