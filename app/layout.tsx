//Global
import { ToastContainer } from "react-toastify";
import React from "react";

//Components
import { ProviderComponent } from "@/redux/provider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ModalCart } from "@/components/modals/cart/modalCart/ModalCart";
import { ModalSignUp } from "@/components/modals/modalSignUp/ModalSignUp";
import { ModalLogIn } from "@/components/modals/modalLogIn/ModalLogIn";
import { ModalOrder } from "@/components/modals/modalOrder/ModalOrder";

//Styles
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logotype.png" />
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
