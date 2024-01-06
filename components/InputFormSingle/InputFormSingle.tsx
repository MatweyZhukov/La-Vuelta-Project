//GLobal
import { IInputFormSingleProps } from "@/types/types";
import { FC } from "react";

const InputFormSingle: FC<IInputFormSingleProps> = (props) => {
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
  } = props;

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

  const InputError = () =>
    errors[name] && (
      <p style={{ textAlign: "left", color: "red", marginTop: "15px" }}>
        {errors[name]?.message?.toString()}
      </p>
    );

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
