"use client";

//Global
import { FC } from "react";
import { useForm } from "react-hook-form";
import { changeModalClasses } from "@/app/layout";

//Components
import { InputsFormList } from "../InputsFormList/InputsFormList";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Types
import { IFormProps, IValueState } from "@/types/types";

//Styles
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
      className={changeModalClasses({
        modalStatus,
        modalClass: styles.modalWrapper,
        modalActiveClass: styles.modalWrapperActive,
      })}
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        onClick={(e) => e.stopPropagation()}
        className={changeModalClasses({
          modalStatus,
          modalClass: styles.modalContent,
          modalActiveClass: styles.modalContentActive,
        })}
      >
        <div className={styles.closeModal}>
          <AiFillCloseCircle
            onClick={() => dispatch(changeModalStatus(false))}
          />
        </div>
        <h1>{title}!</h1>

        <InputsFormList
          inputsForm={inputsForm}
          register={register}
          errors={errors}
        />

        <section data-id="buttons">
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
        </section>
      </form>
    </div>
  );
};

export { Form };
