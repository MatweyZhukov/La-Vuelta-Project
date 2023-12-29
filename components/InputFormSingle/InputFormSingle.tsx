//GLobal
import { IInputFormSingleProps, IInputsForm } from "@/types/types";
import { FC } from "react";

const InputFormSingle: FC<IInputFormSingleProps> = ({
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
}) => {
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

  return (
    <label key={index}>
      {labelName}:
      <input
        {...inputFormProps}
        data-modal-input
        required
        type={inputType}
        placeholder={inputPlaceholder}
      />
      {errors[name] && (
        <p style={{ textAlign: "left", color: "red", marginTop: "15px" }}>
          {errors[name]?.message?.toString()}
        </p>
      )}
    </label>
  );
};

export { InputFormSingle };
