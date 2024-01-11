//Global
import { FC } from "react";

//Utils
import { showToastMessage } from "@/utils/functions";
import { changeModalClasses } from "@/utils/functions";

//Components
import { ModalCartContentEmpty } from "../ModalCartContentEmpty/ModalCartContentEmpty";
import { ModalCartList } from "../ModalCartList/ModalCartList";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { clearUserCart } from "@/GlobalRedux/reducers/userSlice";
import {
  changeModalCartStatus,
  changeModalOrderStatus,
} from "@/GlobalRedux/reducers/modalsSlice";

//Styles
import styles from "@/styles/cart.module.css";

const ModalCartContent: FC = () => {
  const { currentUser } = useTyppedSelector((state) => state.user),
    { modalCart } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  const totalPrice = currentUser.userCart.reduce(
    (sum, currItem) => sum + currItem.totalPrice,
    0
  );

  const totalQuantity = currentUser.userCart.reduce(
    (sum, currItem) => sum + currItem.count,
    0
  );

  const onResetUserCart = () => {
    dispatch(clearUserCart());
    showToastMessage("success", "Your cart was cleared!");
  };

  const handleClick = () => {
    dispatch(changeModalCartStatus(false));

    const timer = setTimeout(() => {
      dispatch(changeModalOrderStatus(true));
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

  const ButtonOrder = () => {
    if (currentUser.userCart.length > 1) {
      return (
        <button
          data-order
          className={styles.modalCartButton}
          onClick={onResetUserCart}
        >
          Reset cart
        </button>
      );
    }
  };

  const IsCartEmpty = () => {
    if (currentUser.userCart.length) {
      return (
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

            {ButtonOrder()}
          </div>
        </>
      );
    }

    return <ModalCartContentEmpty />;
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={modalContent}
      style={!currentUser.userCart.length ? blockStyles : undefined}
    >
      {IsCartEmpty()}
    </div>
  );
};

export { ModalCartContent };
