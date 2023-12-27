//Global
import { FC, useEffect } from "react";
import { changeModalClasses, showToastMessage } from "@/app/layout";

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
import styles from "../../styles/cart.module.css";

const ModalCartContent: FC = () => {
  const { currentUser } = useTyppedSelector((state) => state.user),
    { modalCart } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  const totalPrice = currentUser.userCart.reduce(
      (sum, currItem) => sum + currItem.totalPrice,
      0
    ),
    totalQuantity = currentUser.userCart.reduce(
      (sum, currItem) => sum + currItem.count,
      0
    );

  const onResetUserCart = () => {
    dispatch(clearUserCart());
    showToastMessage("success", "Your cart was cleared!");
  };

  return (
    <>
      <nav
        onClick={(e) => e.stopPropagation()}
        className={changeModalClasses({
          modalStatus: modalCart,
          modalClass: styles.modalCartContent,
          modalActiveClass: styles.modalCartContentActive,
        })}
        style={
          !currentUser.userCart.length
            ? {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
            : undefined
        }
      >
        {currentUser.userCart.length ? (
          <>
            <h1 className={styles.modalCartTitle}>Your Cart!</h1>

            <p className={styles.modalCartInfo}>
              Total Quantity:
              {` ${totalQuantity} thing${totalQuantity > 1 ? "s" : ""}`}
            </p>
            <p className={styles.modalCartInfo}>Total Price: {totalPrice} $</p>

            <div className={styles.cardsWrapper}>
              <ModalCartList cart={currentUser.userCart} />

              <button
                data-order
                className={styles.modalCartButton}
                onClick={() => {
                  dispatch(changeModalCartStatus(false));

                  const timer = setTimeout(() => {
                    dispatch(changeModalOrderStatus(true));
                    clearTimeout(timer);
                  }, 300);
                }}
              >
                Make an order
              </button>

              {currentUser.userCart.length > 1 && (
                <button
                  data-order
                  className={styles.modalCartButton}
                  onClick={onResetUserCart}
                >
                  Reset cart
                </button>
              )}
            </div>
          </>
        ) : (
          <ModalCartContentEmpty />
        )}
      </nav>
    </>
  );
};

export { ModalCartContent };
