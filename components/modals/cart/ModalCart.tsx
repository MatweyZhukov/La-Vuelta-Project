"use client";

//Global
import React, { FC, useEffect } from "react";

//Components
import { ModalCartContent } from "./ModalCartContent";
import { ModalOrder } from "../modalOrder/ModalOrder";

//Icons
import CloseIcon from "@mui/icons-material/Close";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useModalActions } from "@/hooks/useModalActions";
import { useCart } from "@/hooks/useCart";
import { useUserActions } from "@/hooks/useUserActions";

//Styles
import styles from "@/styles/cart.module.css";

const ModalCart: FC = () => {
  const { modalCart } = useTypedSelector(state => state.modals);
  const { currentUser } = useTypedSelector(state => state.user);

  const { changeModalClasses, onChangeModalCartStatus } = useModalActions();
  const { onFetchUserCart } = useCart();
  const { onSetUsers } = useUserActions();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.email) onFetchUserCart();
  }, [dispatch, currentUser.email, onFetchUserCart]);

  useEffect(() => {
    onSetUsers();
  }, [dispatch, currentUser.userCart, onSetUsers]);

  const modalWrapper = changeModalClasses({
    modalStatus: modalCart,
    modalClass: styles.modalCartWrapper,
    modalActiveClass: styles.modalCartWrapperActive,
  });

  const closeBlock = changeModalClasses({
    modalStatus: modalCart,
    modalClass: styles.closeBlock,
    modalActiveClass: styles.closeBlockActive,
  });

  return (
    <>
      <div
        onClick={() => onChangeModalCartStatus(false)}
        className={modalWrapper}
      >
        <section onClick={e => e.stopPropagation()} className={closeBlock}>
          <CloseIcon
            style={{ color: "#fff6e7" }}
            onClick={() => onChangeModalCartStatus(false)}
          />
        </section>
        <ModalCartContent />
      </div>
      <ModalOrder />
    </>
  );
};

export { ModalCart };
