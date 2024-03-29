"use client";

//Global
import React, { FC, useEffect, memo } from "react";
import { useForm } from "react-hook-form";

//Components
import { InputsFormList } from "../inputsFormList/InputsFormList";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useModalActions } from "@/hooks/useModalActions";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Types
import { IFormProps, IValueState } from "@/types/types";

//Styles
import styles from "@/styles/modals.module.css";

const Form: FC<IFormProps> = memo(formProps => {
  const dispatch = useAppDispatch();

  const { changeModalClasses } = useModalActions();

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
  }, [modalStatus, reset]);

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
  });

  const modalContent = changeModalClasses({
    modalStatus,
    modalClass: styles.modalContent,
    modalActiveClass: styles.modalContentActive,
  });

  return (
    <div onClick={handleClick} className={modalWrapper}>
      <form
        onSubmit={handleSubmit(submitForm)}
        onClick={e => e.stopPropagation()}
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
});

Form.displayName = "Form";

export { Form };
