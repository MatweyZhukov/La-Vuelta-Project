//Global
import { FC } from "react";

//Types
import { IInputsFormListProps } from "@/types/types";
import { InputFormSingle } from "../InputFormSingle/InputFormSingle";

const InputsFormList: FC<IInputsFormListProps> = ({
  inputsForm,
  register,
  errors,
}) => {
  return (
    <>
      {inputsForm.map(
        (
          {
            inputType,
            name,
            maxLength,
            minLength,
            inputPlaceholder,
            minLengthText,
            maxLengthText,
          },
          index
        ) => (
          <InputFormSingle
            key={index}
            errors={errors}
            index={index}
            inputPlaceholder={inputPlaceholder}
            inputType={inputType}
            minLength={minLength}
            minLengthText={minLengthText}
            name={name}
            register={register}
            maxLength={maxLength}
            maxLengthText={maxLengthText}
          />
        )
      )}
    </>
  );
};

export { InputsFormList };
