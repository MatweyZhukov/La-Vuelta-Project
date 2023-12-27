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
  return (
    <label key={index}>
      {name.toUpperCase()}:
      <input
        data-modal-input
        {...register(name, {
          required: "This field is required!",
          minLength: {
            value: minLength,
            message: minLengthText,
          },
          maxLength: {
            value: maxLength ? maxLength : 300,
            message: maxLengthText ? maxLengthText : "",
          },
        })}
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
