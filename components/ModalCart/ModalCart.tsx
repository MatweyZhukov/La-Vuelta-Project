"use client";

//Global
import { FC, useEffect } from "react";

//Components
import { ModalCartContent } from "../ModalCartContent/ModalCartContent";

//Actions
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";
import { fetchCart } from "@/GlobalRedux/reducers/cartSlice";

//Hooks
import { useTyppedSelector, useAppDispatch } from "@/hooks/useTyppedSelector";

//Styles
import styles from "../../styles/styles.module.css";

const ModalCart: FC = () => {
  const { modalCart } = useTyppedSelector((state) => state.modals),
    { cart } = useTyppedSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
