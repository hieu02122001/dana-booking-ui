import React from "react";

const Button = ({ children, onClick, bg="bg-primary", isLoading = false }) => {
  return (
    <>
      <button
        className={`px-5 py-3 ${bg} text-white rounded-lg shadow-lg hover:-translate-y-[1px] hover:shadow-2xl`}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-9 h-9 border-8 rounded-full border-t-noColor animate-spin border-slate-300"></div>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default Button;
