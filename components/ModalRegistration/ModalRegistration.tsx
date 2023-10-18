"use client";

//GLobal
import { FC, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";

//Actions
import { changeModalRegistrationStatus } from "@/GlobalRedux/reducers/modalsSlice";

//Styles
import styles from "../../styles/styles.module.css";

const ModalRegistration: FC = () => {
  const [email, setEmail] = useState<string>("");

  const { modalRegistration } = useTyppedSelector((state) => state.modals);

  const dispatch = useDispatch();

  const onChangeModalRegistrationStatus = (status: boolean) => {
    dispatch(changeModalRegistrationStatus(status));
    setEmail("");
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <div
      onClick={() => onChangeModalRegistrationStatus(false)}
      className={
        modalRegistration
          ? `${styles.modalRegistrationWrapper} ${styles.modalRegistrationWrapperActive}`
          : styles.modalRegistrationWrapper
      }
    >
      <form
        onSubmit={(e) => validateForm(e)}
        onClick={(e) => e.stopPropagation()}
        className={
          modalRegistration
            ? `${styles.modalRegistrationContent} ${styles.modalRegistrationContentActive}`
            : styles.modalRegistrationContent
        }
      >
        <div className={styles.closeRegistration}>
          <AiFillCloseCircle
            onClick={() => onChangeModalRegistrationStatus(false)}
          />
        </div>

        <h1>Registration!</h1>

        <p>
          {`We'll`} send you a letter, to confirm you registration on our site!
        </p>

        <input
          type="email"
          required
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send email</button>
      </form>
    </div>
  );
};

export { ModalRegistration };
