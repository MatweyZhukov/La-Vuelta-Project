//Global
import { FC } from "react";
import Link from "next/link";

//Types
import { ILinksMedia } from "@/types/types";

//Icons
import { SlSocialVkontakte } from "react-icons/sl";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

//Styles
import styles from "../../styles/footer.module.css";

export const Footer: FC = () => {
  const linksMedia: ILinksMedia[] = [
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
    {
      href: "https://github.com/MatweyZhukov",
      icon: <FaGithub className={styles.footerSvg} />,
    },
  ];

  const year = new Date().getFullYear();

  const Links = () =>
    linksMedia.map(({ href, icon }, index) => (
      <Link key={index} href={href} className={styles.footerLink}>
        {icon}
      </Link>
    ));

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.footerLeftText}>@{year}, My social media:</p>
          <div className={styles.socialMedia}>{Links()}</div>
        </div>
        <div className={styles.footerRight}>
          <p className={styles.footerRightText}>Other sources:</p>
          <p className={styles.footerRightText}>zhukov.matwei@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
