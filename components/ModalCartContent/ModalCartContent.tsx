//Global
import { FC, useEffect } from "react";
import { changeModalClasses } from "@/app/layout";

//Components
import { ModalCartContentEmpty } from "../ModalCartContentEmpty/ModalCartContentEmpty";
import { ModalCartList } from "../ModalCartList/ModalCartList";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { setUsers } from "@/GlobalRedux/reducers/userSlice";

//Styles
import styles from "../../styles/cart.module.css";

const ModalCartContent: FC = () => {
  const { currentUser } = useTyppedSelector((state) => state.user),
    { modalCart } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, currentUser.userCart]);

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
              {totalQuantity > 1
                ? `${totalQuantity} things`
                : `${totalQuantity} thing`}
            </p>
            <p className={styles.modalCartInfo}>Total Price: {totalPrice} $</p>

            <div className={styles.cardsWrapper}>
              <ModalCartList cart={currentUser.userCart} />

              <button data-order className={styles.modalCartButton}>
                Make an order
              </button>
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
