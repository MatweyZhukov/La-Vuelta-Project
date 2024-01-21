//GLobal
import React, { FC } from "react";

//Types
import { IInputFormSingleProps } from "@/types/types";

const InputFormSingle: FC<IInputFormSingleProps> = (inputFormSingleProps) => {
  const {
    index,
    name,
    register,
    minLength,
    minLengthText,
    maxLength,
    maxLengthText,
    inputType,
    inputPlaceholder,
    errors,
  } = inputFormSingleProps;

  const labelName = name.toUpperCase();

  const inputFormProps = {
    ...register(name, {
      required: "This field is required!",
      minLength: {
        value: minLength,
        message: minLengthText,
      },
      maxLength: {
        value: maxLength ? maxLength : 300,
        message: maxLengthText ? maxLengthText : "",
      },
    }),
  };

  const InputError = () => {
    if (errors[name]) {
      return (
        <p style={{ textAlign: "left", color: "red", marginTop: "15px" }}>
          {errors[name]?.message?.toString()}
        </p>
      );
    }
  };

  return (
    <label key={index}>
      {labelName}:
      <input
        {...inputFormProps}
        data-modal-input
        type={inputType}
        placeholder={inputPlaceholder}
      />
      {InputError()}
    </label>
  );
};

export { InputFormSingle };
