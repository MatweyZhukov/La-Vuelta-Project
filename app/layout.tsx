//Global
import { ToastContainer } from "react-toastify";

//Components
import { ProviderComponent } from "@/GlobalRedux/provider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ModalCart } from "@/components/Modals/Cart/ModalCart/ModalCart";
import { ModalSignUp } from "@/components/Modals/ModalSignUp/ModalSignUp";
import { ModalLogIn } from "@/components/Modals/ModalLogIn/ModalLogIn";
import { ModalOrder } from "@/components/Modals/ModalOrder/ModalOrder";

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
