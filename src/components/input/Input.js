import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name, type = "text", control, edit = false, ...props }) => {
  const { field } = useController({
    control: control,
    name: name,
    defaultValue: "",
  });
  return (
    <input
      type={type}
      id={name}
      maxLength={35}
      className={`w-full py-2 px-3 rounded-md outline-none ${
        edit
          ? "border-noColor bg-noColor"
          : "border bg-grayLight focus:border-primary"
      }`}
      {...field}
      {...props}
    />
  );
};

export default Input;
