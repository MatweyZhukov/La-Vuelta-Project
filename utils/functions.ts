//Global
import { toast } from "react-toastify";

// Types
import { ToastStatusType } from "@/types/types";

export const showToastMessage = (
  toastStatus: ToastStatusType,
  text: string
) => {
  const toastStyles = {
    color: "black",
    background: "#fff6e7",
    userSelect: "none",
    textAlign: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  } as const;

  toast[toastStatus](text, {
    draggable: false,
    position: "top-left",
    autoClose: 1500,
    style: toastStyles,
  });
};
