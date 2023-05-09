import React from "react";
import ReactDOM from "react-dom";

const LoadingModal = () => {
  if (typeof document === "undefined") return <div className="Modal"></div>;
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[550px]  px-5 py-5 flex flex-col">
        <div className="circle-loading"></div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default LoadingModal;
