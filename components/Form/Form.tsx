"use client";

//Global
import { FC, useEffect } from "react";
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

const Form: FC<IFormProps> = (formProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
  } = useForm<IValueState>({ mode: "onBlur" });

  const {
    title,
    titleButton,
    modalStatus,
    changeModalStatus,
    changeModalStatusSecond,
    inputsForm,
    handleFunction,
    disabled,
  } = formProps;

  useEffect(() => {
    !modalStatus && reset();

    //eslint-disable-next-line
  }, [modalStatus]);

  const submitForm = (values: IValueState) => values;

  const onChangeModalsStatus = () => {
    dispatch(changeModalStatus(false));

    const modalTimer = setTimeout(() => {
      dispatch(changeModalStatusSecond(true));
      clearTimeout(modalTimer);
    }, 300);
  };

  const onHandleFunction = () => {
    const { email, password, name } = getValues();

    handleFunction({ email, password, name, reset });
  };

  const handleClick = () => dispatch(changeModalStatus(false));

  const modalWrapper = changeModalClasses({
      modalStatus,
      modalClass: styles.modalWrapper,
      modalActiveClass: styles.modalWrapperActive,
    }),
    modalContent = changeModalClasses({
      modalStatus,
      modalClass: styles.modalContent,
      modalActiveClass: styles.modalContentActive,
    });

  return (
    <div onClick={handleClick} className={modalWrapper}>
      <form
        onSubmit={handleSubmit(submitForm)}
        onClick={(e) => e.stopPropagation()}
        className={modalContent}
      >
        <div className={styles.closeModal}>
          <AiFillCloseCircle onClick={handleClick} />
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
            value={title}
          >
            {title}
          </button>

          <p>or</p>

          <button disabled={disabled} onClick={onChangeModalsStatus}>
            {titleButton}
          </button>
        </section>
      </form>
    </div>
  );
};

export { Form };
