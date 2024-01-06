//Global
import { FC } from "react";
import { Metadata } from "next";

//Types
import { IPizzaTileItem } from "@/types/types";

//Components
import { Spinner } from "@/components/Spinner/Spinner";

//Components
import { PizzaTilesList } from "@/components/PizzaTilesList/PizzaTilesList";

//Services
import { requestToAPI } from "@/services";

//Styles
import styles from "../../styles/pizzasPage.module.css";

export const metadata: Metadata = {
  title: "La Vuelta | Pizzas",
  description: "Created by Zhukov Matvey",
};

const SinglePizza: FC = async () => {
  const tiles = await requestToAPI<IPizzaTileItem[]>("/cards", "get");

  const Tiles = () => {
    return <>{tiles ? <PizzaTilesList tiles={tiles} /> : <Spinner />}</>;
  };

  return (
    <div className={styles.pizzasPageContent}>
      <h1 className={styles.pizzasPageTitle}>Check our pizzas!</h1>
      <Tiles />
    </div>
  );
};

export default SinglePizza;
