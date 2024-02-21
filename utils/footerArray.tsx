//Types
import { ILinksMedia } from "@/types/types";

//Icons
import { SlSocialVkontakte } from "react-icons/sl";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

//Styles
import styles from "@/styles/footer.module.css";

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
  {
    href: "https://github.com/MatweyZhukov",
    icon: <FaGithub className={styles.footerSvg} />,
  },
];
