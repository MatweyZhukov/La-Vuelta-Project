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
    { currentUser } = useTyppedSelector((state) => state.user);

  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    isAuth && dispatch(fetchCart());
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch, currentUser.userCart]);

  const handleClick = () => dispatch(changeModalCartStatus(false));

  const modalWrapper = changeModalClasses({
      modalStatus: modalCart,
      modalClass: styles.modalCartWrapper,
      modalActiveClass: styles.modalCartWrapperActive,
    }),
    closeBlock = changeModalClasses({
      modalStatus: modalCart,
      modalClass: styles.closeBlock,
      modalActiveClass: styles.closeBlockActive,
    });

  return (
    <div onClick={handleClick} className={modalWrapper}>
      <section onClick={(e) => e.stopPropagation()} className={closeBlock}>
        <CloseIcon style={{ color: "#fff6e7" }} onClick={handleClick} />
      </section>
      <ModalCartContent />
    </div>
  );
};

export { ModalCart };
