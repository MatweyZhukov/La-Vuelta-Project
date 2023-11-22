"use client";

//Global
import { FC, useEffect } from "react";

//Components
import { ModalCartContent } from "../ModalCartContent/ModalCartContent";

//Actions
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";
import { fetchCart } from "@/GlobalRedux/reducers/userSlice";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Styles
import styles from "../../styles/styles.module.css";

const ModalCart: FC = () => {
  const { modalCart } = useTyppedSelector((state) => state.modals);

  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCart());
    }

    //eslint-disable-next-line
  }, [dispatch, isAuth]);

  return (
    <main
      onClick={() => dispatch(changeModalCartStatus(false))}
      className={
        modalCart
          ? `${styles.modalCartWrapper} ${styles.modalCartWrapperActive}`
          : styles.modalCartWrapper
      }
    >
      <ModalCartContent />
    </main>
  );
};

export { ModalCart };
