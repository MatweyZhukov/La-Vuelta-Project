//Global
import type { Metadata } from "next";

//Styles
import "../styles/globals.css";
import styles from "../styles/styles.module.css";

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
import { ModalRegistration } from "@/components/ModalRegistration/ModalRegistration";

export const metadata: Metadata = {
  title: "La Vuelta | Main page",
  description: "Created by Zhukov Matvey",
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
          <ModalRegistration />
        </ProviderComponent>
      </body>
    </html>
  );
}
