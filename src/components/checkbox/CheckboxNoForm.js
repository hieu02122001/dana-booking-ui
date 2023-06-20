import React from "react";
import "./styles.scss";

const CheckboxNoForm = ({ checked, onChange }) => {
  return (
    <>
      <label className="container">
        <input
          type="checkbox"
          className=""
          checked={checked}
          onChange={onChange}
        />
        <div className="checkmark"></div>
      </label>
    </>
  );
};

export default CheckboxNoForm;
