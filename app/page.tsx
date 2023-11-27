//GLobal
import Link from "next/link";

//Components
import { Slider } from "@/components/Slider/Slider";
import { Tabs } from "@/components/Tabs/Tabs";
import { Spinner } from "@/components/Spinner/Spinner";

//Types
import { ITabsItem } from "@/types/types";

//Services
import { getDataFromApi } from "@/services/services";

//Styles
import styles from "../styles/mainPage.module.css";

export default async function Home() {
  const tabs = await getDataFromApi<ITabsItem[]>("http://localhost:4000/tabs");

  return (
    <main className={styles.mainPageContent}>
      <h1 className={styles.mainPageTitle}>La Vuelta</h1>
      <nav className={styles.navSlider}>
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
      </nav>
      <h1 className={styles.mainPageTitle}>Our Kinds of Pizza!</h1>
      <nav className={styles.navTabs}>
        {tabs ? <Tabs tabsItem={tabs} /> : <Spinner />}
      </nav>

      <h1 className={styles.mainPageTitle}>Make an order!</h1>

      <section className={styles.offerToPizzas}>
        <p className={styles.offerToPizzasText}>
          Wanna order our pizzas? <br /> Check this out here:
        </p>
        <Link className={styles.offerToPizzasLink} href="/pizzas">
          Our Pizzas!
        </Link>
      </section>
    </main>
  );
}
