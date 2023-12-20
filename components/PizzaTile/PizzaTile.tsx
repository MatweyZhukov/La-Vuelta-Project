//Global
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

//Types
import { IPizzaTileItem } from "@/types/types";

//Styles
import styles from "../../styles/pizzasPage.module.css";

const PizzaTile: FC<{ pizza: IPizzaTileItem }> = ({ pizza }) => {
  const { id, pizzaDescription, pizzaImage, pizzaPrice, pizzaTitle } = pizza;

  return (
    <li className={styles.pizzaTile}>
      <Image src={pizzaImage} alt={pizzaTitle} width={300} height={300} />
      <p className={styles.pizzaTileName}>
        {pizzaTitle.length >= 15 ? `${pizzaTitle.slice(0, 15)}...` : pizzaTitle}
      </p>
      <p className={styles.pizzaTileDescription}>
        {pizzaDescription.length >= 50
          ? `${pizzaDescription.slice(0, 50)}...`
          : pizzaDescription}
      </p>
      <section className={styles.pizzaTileBlock}>
        <Link href={`/pizzas/${id}`}>more details</Link>
        <p className={styles.pizzaTilePrice}>{`${pizzaPrice} $`}</p>
      </section>
    </li>
  );
};

export { PizzaTile };
