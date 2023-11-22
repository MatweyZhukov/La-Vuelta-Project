"use client";

//Global
import { FC } from "react";
import { useForm } from "react-hook-form";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Types
import { IFormProps, IValueState } from "@/types/types";

const Form: FC<IFormProps> = ({
  title,
  titleButton,
  modalStatus,
  changeModalStatus,
  changeModalStatusSecond,
  contentClassName,
  contentActiveClassName,
  closeModalClassName,
  inputsForm,
  handleFunction,
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
  } = useForm<IValueState>({
    mode: "onBlur",
  });

  const submitForm = (values: IValueState) => values;

  const onChangeModalsStatus = () => {
    dispatch(changeModalStatus(false));

    const modalTimer = setTimeout(() => {
      dispatch(changeModalStatusSecond(true));
      clearTimeout(modalTimer);
    }, 300);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      onClick={(e) => e.stopPropagation()}
      className={
        modalStatus
          ? `${contentClassName} ${contentActiveClassName}`
          : contentClassName
      }
    >
      <div className={closeModalClassName}>
        <AiFillCloseCircle onClick={() => dispatch(changeModalStatus(false))} />
      </div>

      <h1>{title}!</h1>

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
          <label key={index}>
            {name.toUpperCase()}:
            <input
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
        )
      )}

      <section data-id="buttons">
        <button
          type="submit"
          disabled={!isValid}
          onClick={() => {
            handleFunction(
              getValues().email,
              getValues().password,
              getValues().name
            );
            reset();
          }}
        >
          {title}
        </button>

        <p>or</p>

        <button onClick={onChangeModalsStatus} type="button">
          {titleButton}
        </button>
      </section>
    </form>
  );
};

export { Form };
