"use client";

//Global
import { FC, useEffect } from "react";
import { changeModalClasses } from "@/app/layout";

//Components
import { ModalCartContent } from "../ModalCartContent/ModalCartContent";

//Icons
import CloseIcon from "@mui/icons-material/Close";

//Actions
import { changeModalCartStatus } from "@/GlobalRedux/reducers/modalsSlice";
import { fetchCart, setUsers } from "@/GlobalRedux/reducers/userSlice";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";

//Styles
import styles from "../../styles/cart.module.css";

const ModalCart: FC = () => {
  const { modalCart } = useTyppedSelector((state) => state.modals),
    { currentUser, users } = useTyppedSelector((state) => state.user);

  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    isAuth && dispatch(fetchCart());
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, currentUser.userCart]);

  return (
    <main
      onClick={() => dispatch(changeModalCartStatus(false))}
      className={changeModalClasses({
        modalStatus: modalCart,
        modalClass: styles.modalCartWrapper,
        modalActiveClass: styles.modalCartWrapperActive,
      })}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={changeModalClasses({
          modalStatus: modalCart,
          modalClass: styles.closeBlock,
          modalActiveClass: styles.closeBlockActive,
        })}
      >
        <CloseIcon
          style={{ color: "#fff6e7" }}
          onClick={() => dispatch(changeModalCartStatus(false))}
        />
      </section>
      <ModalCartContent />
    </main>
  );
};

export { ModalCart };
