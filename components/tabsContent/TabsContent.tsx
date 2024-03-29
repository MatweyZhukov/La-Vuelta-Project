"use client";

//Global
import React, { FC } from "react";
import Image from "next/image";

//Types
import { ITabsItem } from "@/types/types";

//Styles
import styles from "@/styles/mainPage.module.css";

const TabsContent: FC<ITabsItem> = (tabsContentProps) => {
  const { tabDescription, tabImg, tabName, refDescr, refImg } =
    tabsContentProps;

  return (
    <>
      <Image
        ref={refImg}
        className={styles.tabImg}
        src={tabImg}
        alt={tabName}
        width={400}
        height={400}
      />
      <div className={styles.tabDescription}>
        <p ref={refDescr} className={styles.tabDescriptionText}>
          {tabDescription}
        </p>
      </div>
    </>
  );
};

export { TabsContent };
