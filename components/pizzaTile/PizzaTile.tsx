//Global
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

//Utils
import { PIZZAS_PAGE } from "@/utils/routes";

//Types
import { IPizzaTileItem } from "@/types/types";

//Styles
import styles from "@/styles/pizzasPage.module.css";

const PizzaTile: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { id, pizzaDescription, pizzaImage, pizzaPrice, pizzaTitle } = pizza;

  const tileName =
    pizzaTitle.length >= 15 ? `${pizzaTitle.slice(0, 15)}...` : pizzaTitle;

  const description =
    pizzaDescription.length >= 50
      ? `${pizzaDescription.slice(0, 50)}...`
      : pizzaDescription;

  const priceText = `${pizzaPrice} $`;

  return (
    <li className={styles.pizzaTile}>
      <Image src={pizzaImage} alt={pizzaTitle} width={300} height={300} />
      <p className={styles.pizzaTileName}>{tileName}</p>
      <p className={styles.pizzaTileDescription}>{description}</p>
      <section className={styles.pizzaTileBlock}>
        <Link href={`${PIZZAS_PAGE}/${id}`}>more details</Link>
        <p className={styles.pizzaTilePrice}>{priceText}</p>
      </section>
    </li>
  );
};

export { PizzaTile };
