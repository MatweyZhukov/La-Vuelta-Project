//Global
import type { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import "../firebase";

//Styles
import "../styles/globals.css";
import styles from "../styles/styles.module.css";
import "react-toastify/dist/ReactToastify.css";

//Icons
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { SlSocialVkontakte } from "react-icons/sl";

//Types
import { ILinksMedia } from "@/types/types";

//Components
import { ProviderComponent } from "@/GlobalRedux/provider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ModalCart } from "@/components/ModalCart/ModalCart";
import { ModalSignUp } from "@/components/ModalSignUp/ModalSignUp";
import { ModalLogIn } from "@/components/ModalLogIn/ModalLogIn";

export const metadata: Metadata = {
  title: "La Vuelta | Main page",
  description: "Created by Zhukov Matvey",
};

export const showToastMessage = (
  toastStatus: "success" | "error" | "warning",
  text: string
) => {
  toast[toastStatus](text, {
    position: "top-left",
    style: {
      color: "black",
      background: "#fff6e7",
      userSelect: "none",
      textAlign: "center",
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    },
  });
};

export const linksMedia: ILinksMedia[] = [
  {
    href: "https://vk.com/zhukmatvey",
    icon: <SlSocialVkontakte className={styles.footerSvg} />,
  },
  {
    href: "https://t.me/ZhukovMatwey",
    icon: <BsTelegram className={styles.footerSvg} />,
  },
  {
    href: "https://api.whatsapp.com/send/?phone=79001483800&text&type=phone_number&app_absent=0",
    icon: <BsWhatsapp className={styles.footerSvg} />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProviderComponent>
          <main className="wrapper">
            <Header />
            <nav className="main">{children}</nav>
            <Footer />
          </main>
          <ModalCart />
          <ModalSignUp />
          <ModalLogIn />
          <ToastContainer />
        </ProviderComponent>
      </body>
    </html>
  );
}
