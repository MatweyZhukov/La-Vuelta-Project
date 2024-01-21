//Global
import Image from "next/image";
import React, { FC } from "react";
import { Metadata } from "next";

//Components
import { Spinner } from "@/components/spinner/Spinner";
import { PizzaDetails } from "@/components/pizzaDetails/PizzaDetails";

//Services
import { requestToAPI } from "@/services";

//Types
import { IPizzaTileItem } from "@/types/types";

//Styles
import styles from "../../../styles/pizzaSinglePage.module.css";

export const metadata: Metadata = {
  title: "La Vuelta | One Pizza",
  description: "Created by Zhukov Matvey",
};

const SinglePizza: FC<{ params: { id: number } }> = async ({ params }) => {
  const pizza = await requestToAPI<IPizzaTileItem>(
    `/cards/${params.id}`,
    "get"
  );

  const Pizza = () => {
    return pizza ? (
      <div className={styles.singlePagePizzaWrapper}>
        <h1>{pizza.pizzaTitle}</h1>

        <div className={styles.singlePagePizzaContent}>
          <PizzaDetails pizza={pizza} />

          <Image
            src={pizza.pizzaImage}
            alt={pizza.pizzaTitle}
            width={500}
            height={500}
          />
        </div>
      </div>
    ) : (
      <Spinner />
    );
  };

  return <>{Pizza()}</>;
};

export default SinglePizza;
