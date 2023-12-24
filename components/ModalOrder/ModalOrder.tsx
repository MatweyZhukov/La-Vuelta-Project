"use client";

//Global
import { FC, useState } from "react";
import { changeModalClasses } from "@/app/layout";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { changeModalOrderStatus } from "@/GlobalRedux/reducers/modalsSlice";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Styles
import styles from "../../styles/modals.module.css";
import { YMapsComponent } from "../YMapsComponent/YMapsComponent";

const ModalOrder: FC = () => {
  const { modalOrder } = useTyppedSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(changeModalOrderStatus(false))}
      className={changeModalClasses({
        modalStatus: modalOrder,
        modalClass: styles.modalWrapper,
        modalActiveClass: styles.modalWrapperActive,
      })}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className={changeModalClasses({
          modalStatus: modalOrder,
          modalClass: styles.modalContent,
          modalActiveClass: styles.modalContentActive,
        })}
      >
        <div className={styles.closeModal}>
          <AiFillCloseCircle
            onClick={() => dispatch(changeModalOrderStatus(false))}
          />
        </div>

        <h1>{"Make an order to..."}</h1>

        <YMapsComponent />

        <button data-map-order type="button">
          Order
        </button>
      </form>
    </div>
  );
};

export { ModalOrder };
