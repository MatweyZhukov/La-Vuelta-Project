//Global
import { FC } from "react";
import { showToastMessage } from "@/app/layout";

//Icons
import { GrClose } from "react-icons/gr";

//Components
import { ModalCartContentEmpty } from "../ModalCartContentEmpty/ModalCartContentEmpty";
import { ModalCartList } from "../ModalCartList/ModalCartList";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";
import { deletePizzaFromCart } from "@/GlobalRedux/reducers/cartSlice";

//Styles
import styles from "../../styles/styles.module.css";

const ModalCartContent: FC = () => {
  const { cart } = useTyppedSelector((state) => state.cart),
    { modalCart } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  const totalPrice = cart.reduce(
      (sum, currItem) => sum + currItem.totalPrice,
      0
    ),
    totalQuantity = cart.reduce((sum, currItem) => sum + currItem.count, 0);

  const onClearCart = () => {
    cart.forEach((item) => {
      dispatch(deletePizzaFromCart(item.id));
    });

    showToastMessage("success", "Your cart has been emptied!");
  };

  return (
    <>
      <section
        onClick={(e) => e.stopPropagation()}
        className={
          modalCart
            ? `${styles.closeBlock} ${styles.closeBlockActive}`
            : styles.closeBlock
        }
      >
        <GrClose onClick={() => dispatch(changeModalCartStatus(false))} />
      </section>

      <nav
        onClick={(e) => e.stopPropagation()}
        className={
          modalCart
            ? `${styles.modalCartContent} ${styles.modalCartContentActive}`
            : styles.modalCartContent
        }
      >
        <h1 className={styles.modalCartTitle}>Your Cart!</h1>

        {cart.length > 1 ? (
          <button
            data-clear
            onClick={onClearCart}
            className={styles.modalCartButton}
          >
            Clear your cart
          </button>
        ) : null}

        {totalPrice && totalQuantity ? (
          <>
            <p className={styles.modalCartInfo}>
              Total Quantity: {totalQuantity}
            </p>
            <p className={styles.modalCartInfo}>Total Price: {totalPrice} $</p>
          </>
        ) : null}

        <div className={styles.cardsWrapper}>
          {cart.length ? (
            <>
              <ModalCartList cart={cart} />

              <button data-order className={styles.modalCartButton}>
                Make an order
              </button>
            </>
          ) : (
            <ModalCartContentEmpty />
          )}
        </div>
      </nav>
    </>
  );
};

export { ModalCartContent };
