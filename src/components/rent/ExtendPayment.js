import React from "react";
import ReactDOM from "react-dom";

import Button from "../button/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

const ExtendPayment = ({ handleClose, handleExtendDue, id }) => {
  const [months, setMonths] = useState(1);
  if (typeof document === "undefined") return <div className="Modal"></div>;
  const handleMonthsChange = (e) => {
    if (e.target.value < 1) return;
    setMonths(e.target.value);
  };
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div
        onClick={handleClose}
        className="w-8 h-8 absolute top-5 right-5 cursor-pointer z-60"
      >
        <AiOutlineCloseCircle className="w-full h-full" />
      </div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[220px]  bg-slate-100 px-5 py-5 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-5">
          Enter your months you want to extend:
        </h2>
        <input
          type="number"
          className="w-full max-w-[150px] py-2 px-3 rounded-md outline-none border bg-slate-200 focus:border-primary"
          onChange={handleMonthsChange}
          value={months}
        />
        <div className="w-[200px] flex items-center justify-center mt-auto">
          <Button onClick={() => handleExtendDue(id, months)}>Payment</Button>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default ExtendPayment;
