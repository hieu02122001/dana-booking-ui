import React from "react";
import Loading from "./Loading";

const ModalLoading = () => {
  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div className="relative z-10 rounded-lg w-full max-w-[500px] h-[550px]  px-5 py-5 flex flex-col">
        <Loading></Loading>
      </div>
    </div>
  );
};

export default ModalLoading;
