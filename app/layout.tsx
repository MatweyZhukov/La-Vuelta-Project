//Global
import { ToastContainer, toast } from "react-toastify";

//Firebase
import "../firebase";

//Types
import { IChangeModalClassesFunc } from "@/types/types";

//Components
import { ProviderComponent } from "@/GlobalRedux/provider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ModalCart } from "@/components/ModalCart/ModalCart";
import { ModalSignUp } from "@/components/ModalSignUp/ModalSignUp";
import { ModalLogIn } from "@/components/ModalLogIn/ModalLogIn";
import { ModalOrder } from "@/components/ModalOrder/ModalOrder";

//Styles
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const showToastMessage = (
  toastStatus: "success" | "error" | "warning",
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

export const changeModalClasses = (params: IChangeModalClassesFunc) => {
  const { modalActiveClass, modalClass, modalStatus } = params;

  const stringResult = modalStatus
    ? `${modalClass} ${modalActiveClass}`
    : modalClass;

  return stringResult;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="#" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <ProviderComponent>
          <main className="wrapper">
            <Header />
            <nav className="main">{children}</nav>
            <Footer />
          </main>
          <ModalOrder />
          <ModalCart />
          <ModalSignUp />
          <ModalLogIn />
          <ToastContainer />
        </ProviderComponent>
      </body>
    </html>
  );
}
