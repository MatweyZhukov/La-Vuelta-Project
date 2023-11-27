"use client";

//Global
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Types
import { IFormProps, IValueState } from "@/types/types";

import styles from "../../styles/modals.module.css";

const Form: FC<IFormProps> = ({
  title,
  titleButton,
  modalStatus,
  changeModalStatus,
  changeModalStatusSecond,
  inputsForm,
  handleFunction,
  disabled,
}) => {
  const { status } = useTyppedSelector((state) => state.user);

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

  const onHandleFunction = () => {
    handleFunction(
      getValues().email,
      getValues().password,
      getValues().name,
      reset
    );
  };

  return (
    <div
      onClick={() => dispatch(changeModalStatus(false))}
      className={
        modalStatus
          ? `${styles.modalWrapper} ${styles.modalWrapperActive}`
          : styles.modalWrapper
      }
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        onClick={(e) => e.stopPropagation()}
        className={
          modalStatus
            ? `${styles.modalContent} ${styles.modalContentActive}`
            : styles.modalContent
        }
      >
        <div className={styles.closeModal}>
          <AiFillCloseCircle
            onClick={() => dispatch(changeModalStatus(false))}
          />
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
                <p
                  style={{ textAlign: "left", color: "red", marginTop: "15px" }}
                >
                  {errors[name]?.message?.toString()}
                </p>
              )}
            </label>
          )
        )}

        <section data-id="buttons">
          {status === "pending" ? (
            <h1>Wait a second please...</h1>
          ) : (
            <>
              <button
                type="submit"
                disabled={!isValid && disabled}
                onClick={onHandleFunction}
              >
                {title}
              </button>

              <p>or</p>

              <button
                disabled={disabled}
                onClick={onChangeModalsStatus}
                type="button"
              >
                {titleButton}
              </button>
            </>
          )}
        </section>
      </form>
    </div>
  );
};

export { Form };
