//Global
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

//Types
import { PizzaTileType } from "@/types/types";

//Styles
import styles from "../../styles/styles.module.css";

const PizzaTile: FC<{ pizza: PizzaTileType }> = ({ pizza }) => {
  const { id, pizzaDescription, pizzaImage, pizzaPrice, pizzaTitle } = pizza;

  return (
    <li className={styles.pizzaTile}>
      <Image src={pizzaImage} alt={pizzaTitle} width={300} height={300} />
      <p className={styles.pizzaTileName}>{pizzaTitle}</p>
      <p className={styles.pizzaTileDescription}>{pizzaDescription}</p>
      <section className={styles.pizzaTileBlock}>
        <Link href={`/pizzas/${id}`}>more details</Link>
        <p className={styles.pizzaTilePrice}>{pizzaPrice} $</p>
      </section>
    </li>
  );
};

export { PizzaTile };
