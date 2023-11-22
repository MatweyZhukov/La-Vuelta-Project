//Global
import { FC, useEffect } from "react";

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

//Styles
import styles from "../../styles/styles.module.css";

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
          {currentUser.userCart.length ? (
            <>
              <ModalCartList cart={currentUser.userCart} />

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
