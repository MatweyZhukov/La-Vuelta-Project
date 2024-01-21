//Global
import { FC } from "react";
import { Metadata } from "next";

//Types
import { IPizzaTileItem } from "@/types/types";

//Components
import { Spinner } from "@/components/spinner/Spinner";

//Global
import React from "react";

//Components
import { PizzaTilesList } from "@/components/pizzaTilesList/PizzaTilesList";

//Services
import { requestToAPI } from "@/services";

//Styles
import styles from "../../styles/pizzasPage.module.css";

export const metadata: Metadata = {
  title: "La Vuelta | Pizzas List",
  description: "Created by Zhukov Matvey",
};

const SinglePizza: FC = async () => {
  const tiles = await requestToAPI<IPizzaTileItem[]>("/cards", "get");

  const Tiles = () => (
    <>{tiles ? <PizzaTilesList tiles={tiles} /> : <Spinner />}</>
  );

  return (
    <div className={styles.pizzasPageContent}>
      <h1 className={styles.pizzasPageTitle}>Check our pizzas!</h1>
      {Tiles()}
    </div>
  );
};

export default SinglePizza;
