"use client";

//Global
import React, { FC, useState, useRef, MutableRefObject } from "react";

//Components
import { TabsContent } from "../tabsContent/TabsContent";
import { ITabsItem } from "@/types/types";

//Styles
import styles from "@/styles/mainPage.module.css";

const Tabs: FC<{ tabsItem: ITabsItem[] }> = ({ tabsItem }) => {
  const [activeTab, setActiveTab] = useState<number>(0),
    [disabled, setDisabled] = useState<boolean>(false);

  const refImg: MutableRefObject<HTMLImageElement | null> = useRef(null),
    refDescr: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const addFadeAnimation = () => {
    const img = refImg.current,
      descr = refDescr.current;

    if (img && descr) {
      setDisabled(true);

      img.classList.add(`${styles.fade}`);
      descr.classList.add(`${styles.fade}`);

      const timer = setTimeout(() => {
        setDisabled(false);

        clearTimeout(timer);

        img.classList.remove(`${styles.fade}`);
        descr.classList.remove(`${styles.fade}`);
      }, 300);
    }
  };

  const returnButtonClassName = (index: number) => {
    if (index === activeTab) {
      return `${styles.tabOption} ${styles.tabOptionActive}`;
    }

    return styles.tabOption;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    if (target.tagName.toLowerCase() === "button") {
      setActiveTab(+target.id);
      addFadeAnimation();
    }
  };

  const TabsFunc = () =>
    tabsItem.map(({ tabName }, index) => (
      <button
        disabled={disabled}
        id={`${index}`}
        onClick={(e) => handleClick(e)}
        key={index}
        className={returnButtonClassName(index)}
      >
        {tabName}
      </button>
    ));

  const TabsContentFunc = () =>
    tabsItem[activeTab] && (
      <TabsContent
        {...tabsItem[activeTab]}
        refImg={refImg}
        refDescr={refDescr}
      />
    );

  return (
    <>
      <ul className={styles.tabOptions}>{TabsFunc()}</ul>

      {TabsContentFunc()}
    </>
  );
};

export { Tabs };
