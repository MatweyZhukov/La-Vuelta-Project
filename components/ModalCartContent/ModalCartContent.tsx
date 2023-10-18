//Global
import { FC } from "react";

//Icons
import { GrClose } from "react-icons/gr";

//Components
import { ModalCartContentEmpty } from "../ModalCartContentEmpty/ModalCartContentEmpty";

//Hooks
import { useTyppedSelector, useAppDispatch } from "@/hooks/useTyppedSelector";

//Actions
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";

//Styles
import styles from "../../styles/styles.module.css";
import ModalCartList from "../ModalCartList/ModalCartList";

const ModalCartContent: FC = () => {
  const { cart } = useTyppedSelector((state) => state.cart),
    { modalCart } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  const totalPrice = cart.reduce(
      (sum, currItem) => sum + currItem.pizzaPrice,
      0
    ),
    totalQuantity = cart.reduce((sum, currItem) => sum + currItem.count, 0);

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
            <ModalCartList cart={cart} />
          ) : (
            <ModalCartContentEmpty />
          )}
        </div>
      </nav>
    </>
  );
};

export { ModalCartContent };
