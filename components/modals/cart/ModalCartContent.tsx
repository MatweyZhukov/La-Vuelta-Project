//Global
import React, { FC } from "react";

//Utils
import { showToastMessage } from "@/utils/functions";

//Components
import { ModalCartContentEmpty } from "./ModalCartContentEmpty";
import { ModalCartList } from "./ModalCartList";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useModalActions } from "@/hooks/useModalActions";
import { useCart } from "@/hooks/useCart";

//Styles
import styles from "@/styles/cart.module.css";

const ModalCartContent: FC = () => {
  const { currentUser } = useTypedSelector(state => state.user),
    { modalCart } = useTypedSelector(state => state.modals);

  const {
    changeModalClasses,
    onChangeModalCartStatus,
    onChangeModalOrderStatus,
  } = useModalActions();
  const { onClearUserCart } = useCart();

  const totalPrice = currentUser.userCart.reduce(
    (sum, currItem) => sum + currItem.totalPrice,
    0
  );

  const totalQuantity = currentUser.userCart.reduce(
    (sum, currItem) => sum + currItem.count,
    0
  );

  const onResetUserCart = () => {
    onClearUserCart();
    showToastMessage("success", "Your cart was cleared!");
  };

  const handleClick = () => {
    onChangeModalCartStatus(false);

    const timer = setTimeout(() => {
      onChangeModalOrderStatus(true);
      clearTimeout(timer);
    }, 300);
  };

  const modalContent = changeModalClasses({
    modalStatus: modalCart,
    modalClass: styles.modalCartContent,
    modalActiveClass: styles.modalCartContentActive,
  });

  const blockStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  } as const;

  const infoText = `Total Quantity: ${totalQuantity} ${
    totalQuantity > 1 ? "things" : "thing"
  }`;

  const priceText = `Total Price: ${totalPrice} $`;

  const blockStyle = !currentUser.userCart.length ? blockStyles : undefined;

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={modalContent}
      style={blockStyle}
    >
      {!currentUser.userCart.length ? (
        <ModalCartContentEmpty />
      ) : (
        <>
          <h1 className={styles.modalCartTitle}>Your Cart!</h1>

          <p className={styles.modalCartInfo}>{infoText}</p>
          <p className={styles.modalCartInfo}>{priceText}</p>

          <div className={styles.cardsWrapper}>
            <ModalCartList cart={currentUser.userCart} />

            <button
              data-order
              className={styles.modalCartButton}
              onClick={handleClick}
            >
              Make an order
            </button>

            {currentUser.userCart.length > 1 && (
              <button
                data-reset
                className={styles.modalCartButton}
                onClick={onResetUserCart}
              >
                Reset cart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { ModalCartContent };
