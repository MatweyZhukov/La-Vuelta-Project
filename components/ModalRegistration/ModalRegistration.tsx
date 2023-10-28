"use client";

//GLobal
import { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Actions
import { changeModalRegistrationStatus } from "@/GlobalRedux/reducers/modalsSlice";

//Styles
import styles from "../../styles/styles.module.css";

//Types
import { IValueState } from "@/types/types";

const ModalRegistration: FC = () => {
  const [value, setValue] = useState<IValueState>({
    email: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    console.log(value);
  }, [value]);
  const { modalRegistration } = useTyppedSelector((state) => state.modals);

  const dispatch = useDispatch();

  const changeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      onClick={() => dispatch(changeModalRegistrationStatus(false))}
      className={
        modalRegistration
          ? `${styles.modalRegistrationWrapper} ${styles.modalRegistrationWrapperActive}`
          : styles.modalRegistrationWrapper
      }
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className={
          modalRegistration
            ? `${styles.modalRegistrationContent} ${styles.modalRegistrationContentActive}`
            : styles.modalRegistrationContent
        }
      >
        <div className={styles.closeRegistration}>
          <AiFillCloseCircle
            onClick={() => dispatch(changeModalRegistrationStatus(false))}
          />
        </div>

        <h1>Registration!</h1>

        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email..."
          value={value.email}
          onChange={changeValueInput}
        />

        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name..."
          value={value.name}
          onChange={changeValueInput}
        />

        <input
          type="tel"
          name="phone"
          required
          placeholder="Enter your phone..."
          value={value.phone}
          onChange={changeValueInput}
        />

        <button type="submit">Send data</button>
      </form>
    </div>
  );
};

export { ModalRegistration };
