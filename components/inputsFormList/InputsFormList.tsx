//Global
import React, { FC } from "react";

//Types
import { IInputsFormListProps } from "@/types/types";
import { InputFormSingle } from "../inputFormSingle/InputFormSingle";

const InputsFormList: FC<IInputsFormListProps> = (inputsListProps) => {
  const { inputsForm, register, errors } = inputsListProps;

  const Inputs = () =>
    inputsForm.map(
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
    );

  return <>{Inputs()}</>;
};

export { InputsFormList };
