"use client";

//Global
import { FC, MutableRefObject, useEffect, useRef, useState } from "react";

//Utils
import { changeModalClasses } from "@/utils/functions";

//Utils
import { showToastMessage } from "@/utils/functions";

//Components
import { YMapsComponent } from "../../YMapsComponent/YMapsComponent";

//Types
import { IMapRef, IMapsInitialState, IOrder } from "@/types/types";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { changeModalOrderStatus } from "@/GlobalRedux/reducers/modalsSlice";
import { getOrders, postUserOrder } from "@/GlobalRedux/reducers/orderSlice";
import { clearUserCart } from "@/GlobalRedux/reducers/userSlice";

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

  const { modalOrder } = useTyppedSelector((state) => state.modals),
    { currentUser } = useTyppedSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const mapRef: MutableRefObject<IMapRef | null> = useRef(null),
    formRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleReset = () => {
    setState({ ...state, title: "" });

    if (mapRef.current) {
      mapRef.current.setCenter(state.center);
      mapRef.current.setZoom(state.zoom);
    }
  };

  const dispatchMakeOrder = () => {
    const messageText = "Your order has been successfully placed!";

    showToastMessage("success", messageText);
    dispatch(changeModalOrderStatus(false));
    setDisabled(false);
    handleReset();
    dispatch(clearUserCart());
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

      dispatch(postUserOrder(newUserOrder))
        .then(() => dispatchMakeOrder())
        .catch((e) => console.log(e))
        .finally(() => setDisabled(false));
    } else {
      const messageText =
        "Please select your address before placing the order!";

      showToastMessage("warning", messageText);
    }
  };

  const handleClick = () => dispatch(changeModalOrderStatus(false));

  const modalWrapper = changeModalClasses({
      modalStatus: modalOrder,
      modalClass: styles.modalWrapper,
      modalActiveClass: styles.modalWrapperActive,
    }),
    modalContent = changeModalClasses({
      modalStatus: modalOrder,
      modalClass: styles.modalContent,
      modalActiveClass: styles.modalContentActive,
    });

  return (
    <div ref={formRef} onClick={handleClick} className={modalWrapper}>
      <form onClick={(e) => e.stopPropagation()} className={modalContent}>
        <div className={styles.closeModal}>
          <AiFillCloseCircle onClick={handleClick} />
        </div>

        <h1>Orderring to...</h1>

        <YMapsComponent
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
