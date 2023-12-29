//Global
import { FC } from "react";

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

const SinglePizza: FC = async () => {
  const tiles = await requestToAPI<IPizzaTileItem[]>("/cards", "get");

  return (
    <div className={styles.pizzasPageContent}>
      <h1 className={styles.pizzasPageTitle}>Check our pizzas!</h1>
      {tiles ? <PizzaTilesList tiles={tiles} /> : <Spinner />}
    </div>
  );
};

export default SinglePizza;
