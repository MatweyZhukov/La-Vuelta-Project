"use client";

//Global
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

//Utils
import { showToastMessage } from "@/utils/functions";

//Components
import { YandexMaps } from "../../yandexMaps/YandexMaps";

//Types
import { IMapRef, IMapsInitialState, IOrder } from "@/types/types";

//Hooks
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useModalActions } from "@/hooks/useModalActions";
import { useUserActions } from "@/hooks/useUserActions";
import { useCart } from "@/hooks/useCart";

//Icons
import { AiFillCloseCircle } from "react-icons/ai";

//Styles
import styles from "@/styles/modals.module.css";

const ModalOrder: FC = () => {
  const [state, setState] = useState<IMapsInitialState>({
    title: "",
    center: [55.749451, 37.542824],
    zoom: 12,
  });

  const [disabled, setDisabled] = useState<boolean>(false);

  const { modalOrder } = useTypedSelector(state => state.modals),
    { currentUser } = useTypedSelector(state => state.user);

  const dispatch = useAppDispatch();

  const mapRef: MutableRefObject<IMapRef | null> = useRef(null),
    formRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const { changeModalClasses, onChangeModalOrderStatus } = useModalActions();
  const { onPostUserOrder, onGetUserOrders } = useUserActions();
  const { onClearUserCart } = useCart();

  useEffect(() => {
    onGetUserOrders();
  }, [dispatch]);

  const handleReset = () => {
    setState({ ...state, title: "" });

    if (mapRef.current) {
      mapRef.current.setCenter(state.center);
      mapRef.current.setZoom(state.zoom);
    }
  };

  const makeOrderByUser = () => {
    const newUserOrder: IOrder = {
      address: state.title,
      userCart: currentUser.userCart,
      userEmail: currentUser.email,
      userName: currentUser.name,
      userId: currentUser.id,
    };

    if (state.title) {
      setDisabled(true);

      onPostUserOrder(newUserOrder)
        .then(() => {
          showToastMessage(
            "success",
            "Your order has been successfully placed!"
          );

          onChangeModalOrderStatus(false);
          setDisabled(false);
          handleReset();
          onClearUserCart();
        })
        .catch(e => console.log(e))
        .finally(() => setDisabled(false));
    } else {
      showToastMessage(
        "warning",
        "Please select your address before placing the order!"
      );
    }
  };

  const modalWrapper = changeModalClasses({
    modalStatus: modalOrder,
    modalClass: styles.modalWrapper,
    modalActiveClass: styles.modalWrapperActive,
  });

  const modalContent = changeModalClasses({
    modalStatus: modalOrder,
    modalClass: styles.modalContent,
    modalActiveClass: styles.modalContentActive,
  });

  return (
    <div
      ref={formRef}
      onClick={() => onChangeModalOrderStatus(false)}
      className={modalWrapper}
    >
      <form onClick={e => e.stopPropagation()} className={modalContent}>
        <div className={styles.closeModal}>
          <AiFillCloseCircle onClick={() => onChangeModalOrderStatus(false)} />
        </div>

        <h1>Ordering to...</h1>

        <YandexMaps
          formRef={formRef}
          YMapsState={state}
          setYMapsState={setState}
          handleReset={handleReset}
          mapRef={mapRef}
        />

        <button
          data-map-order
          type="button"
          onClick={makeOrderByUser}
          disabled={disabled}
        >
          Order
        </button>
      </form>
    </div>
  );
};

export { ModalOrder };
