"use client";

//Global
import { FC, useState, useRef, MutableRefObject } from "react";

//Components
import { TabsContent } from "../TabsContent/TabsContent";
import { ITabsItem } from "@/types/types";

//Styles
import styles from "../../styles/mainPage.module.css";

const Tabs: FC<{ tabsItem: ITabsItem[] }> = ({ tabsItem }) => {
  const [activeTab, setActiveTab] = useState<number>(0),
    [disabled, setDisabled] = useState<boolean>(false);

  let refImg: MutableRefObject<HTMLImageElement | null> = useRef(null);
  let refDescr: MutableRefObject<HTMLDivElement | null> = useRef(null);

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

  return (
    <>
      <ul className={styles.tabOptions}>
        {tabsItem.map(({ tabName }, index) => (
          <button
            disabled={disabled}
            id={`${index}`}
            onClick={(e: any) => {
              setActiveTab(+e.target.id);
              addFadeAnimation();
            }}
            key={index}
            className={
              index === activeTab
                ? `${styles.tabOption} ${styles.tabOptionActive}`
                : styles.tabOption
            }
          >
            {tabName}
          </button>
        ))}
      </ul>

      {tabsItem[activeTab] && (
        <TabsContent
          {...tabsItem[activeTab]}
          refImg={refImg}
          refDescr={refDescr}
        />
      )}
    </>
  );
};

export { Tabs };
