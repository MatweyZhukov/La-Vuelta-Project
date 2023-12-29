//Global
import { FC } from "react";
import Link from "next/link";
import { linksMedia } from "@/app/layout";

//Styles
import styles from "../../styles/footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.footerLeftText}>
            @{new Date().getFullYear()}, My social media:
          </p>
          <div className={styles.socialMedia}>
            {linksMedia.map(({ href, icon }, index) => (
              <Link key={index} href={href} className={styles.footerLink}>
                {icon}
              </Link>
            ))}
          </div>
          <div className={styles.socialMedia}></div>
        </div>
        <div className={styles.footerRight}>
          <p className={styles.footerRightText}>Other sources:</p>
          <p className={styles.footerRightText}>zhukov.matwei@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
