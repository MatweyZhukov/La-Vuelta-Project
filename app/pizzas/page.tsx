//Global
import { FC } from "react";

//Types
import { IPizzaTileItem } from "@/types/types";

//Components
import { Spinner } from "@/components/Spinner/Spinner";

//Components
import { PizzaTilesList } from "@/components/PizzaTilesList/PizzaTilesList";

//Services
import { getDataFromApi } from "@/services/services";

//Styles
import styles from "../../styles/styles.module.css";

const SinglePizza: FC = async () => {
  const tiles = await getDataFromApi<IPizzaTileItem[]>(
    "http://localhost:4000/cards"
  );

  return (
    <nav className={styles.pizzasPageContent}>
      <h1 className={styles.pizzasPageTitle}>Check our pizzas!</h1>
      {tiles ? <PizzaTilesList tiles={tiles} /> : <Spinner />}
    </nav>
  );
};

export default SinglePizza;
