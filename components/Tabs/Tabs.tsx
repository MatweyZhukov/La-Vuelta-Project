"use client";

//Global
import { FC, useState, useRef, MutableRefObject } from "react";

//Styles
import styles from "../../styles/styles.module.css";

//Components
import { TabsContent } from "../TabsContent/TabsContent";
import { ITabsItem } from "@/types/types";

const Tabs: FC<{ tabsItem: ITabsItem[] }> = ({ tabsItem }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  let refImg: MutableRefObject<HTMLImageElement | null> = useRef(null);
  let refDescr: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const addFadeAnimation = () => {
    const img = refImg.current,
      descr = refDescr.current;

    img?.classList.add(`${styles.fade}`);
    descr?.classList.add(`${styles.fade}`);

    setTimeout(() => {
      img?.classList.remove(`${styles.fade}`);
      descr?.classList.remove(`${styles.fade}`);
    }, 300);
  };

  return (
    <>
      <ul className={styles.tabOptions}>
        {tabsItem.map(({ tabName }, index) => (
          <li
            id={`${index}`}
            onClick={(e) => {
              // @ts-ignore
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
          </li>
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
