//Global
import Image from "next/image";

//Components
import { Spinner } from "@/components/Spinner/Spinner";
import { SinglePagePizzaContent } from "@/components/SinglePagePizzaContent/SinglePagePizzaContent";

//Services
import { getDataFromApi } from "@/services/services";

//Types
import { IPizzaTileItem } from "@/types/types";

//Styles
import styles from "../../../styles/pizzaSinglePage.module.css";

const SinglePizza = async ({ params }: { params: { id: number } }) => {
  const pizza = await getDataFromApi<IPizzaTileItem>(
    `http://localhost:4000/cards/${params.id}`
  );

  return (
    <>
      {pizza ? (
        <div className={styles.singlePagePizzaWrapper}>
          <h1>{pizza.pizzaTitle}</h1>

          <div className={styles.singlePagePizzaContent}>
            <SinglePagePizzaContent pizza={pizza} />

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
      )}
    </>
  );
};

export default SinglePizza;
