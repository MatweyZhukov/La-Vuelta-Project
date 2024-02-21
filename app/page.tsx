//GLobal
import Link from "next/link";
import { Metadata } from "next";
import React from "react";

//Components
import { Slider } from "@/components/slider/Slider";
import { Tabs } from "@/components/tabs/Tabs";
import { Spinner } from "@/components/spinner/Spinner";

//Types
import { ITabsItem } from "@/types/types";

//Services
import { requestToAPI } from "@/services";

//Styles
import styles from "../styles/mainPage.module.css";
import { PIZZAS_PAGE } from "@/utils/routes";

export const metadata: Metadata = {
  title: "La Vuelta | Main page",
  description: "Created by Zhukov Matvey",
};

export default async function Home() {
  const tabs = await requestToAPI<ITabsItem[]>("/tabs", "get");

  const TabsFunc = () => (tabs ? <Tabs tabsItem={tabs} /> : <Spinner />);

  return (
    <div className={styles.mainPageContent}>
      <h1 className={styles.mainPageTitle}>Welcome to La Vuelta!</h1>

      <div className={styles.navSlider}>
        <Slider />
        <div className={styles.offer}>
          <h1 className={styles.offerTitle}>Our offers to you:</h1>
          <p className={styles.offerDescription}>
            Everyone has their own tastes and preferences, no one argues, but we
            wanna offer you our pizza kinds:
          </p>
          <ul className={styles.offerOptions}>
            <li className={styles.offerOption}>
              1) Kids pizza - pizza without any fats. {"That's"} rather good for
              children under 12 y.o.
            </li>
            <li className={styles.offerOption}>
              2) Vegan pizza - pizza, who {"doesn't"} like the taste of meat. We
              add there mushrooms, vegetables and fruit.
            </li>
            <li className={styles.offerOption}>
              3) Classical meat pizza - pizza for those people, who likes any
              meat. The most popular option.
            </li>
          </ul>
        </div>
      </div>

      <h1 className={styles.mainPageTitle}>Our Kinds of Pizza!</h1>

      <section className={styles.navTabs}>{TabsFunc()}</section>

      <h1 className={styles.mainPageTitle}>Make an order!</h1>

      <section className={styles.offerToPizzas}>
        <p className={styles.offerToPizzasText}>
          Wanna order our pizzas? <br /> Check this out here:{" "}
          <Link className={styles.offerToPizzasLink} href={PIZZAS_PAGE}>
            Our Pizzas!
          </Link>
        </p>
      </section>
    </div>
  );
}
