//Global
import React, { FC } from "react";
import Link from "next/link";

//Utils
import { linksMedia } from "@/utils/footerArray";

//Styles
import styles from "@/styles/footer.module.css";

const Footer: FC = () => {
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

export { Footer };
