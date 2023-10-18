//Global
import { FC } from "react";

//Types
import { PizzaTileType } from "@/types/types";

//Components
import { PizzaTile } from "../PizzaTile/PizzaTile";

//Styles
import styles from "../../styles/styles.module.css";

const PizzaTilesList: FC<{ tiles: PizzaTileType[] }> = ({ tiles }) => {
  return (
    <ul className={styles.pizzaTilesWrapper}>
      {tiles.map((tile) => (
        <PizzaTile key={tile.id} pizza={tile} />
      ))}
    </ul>
  );
};

export { PizzaTilesList };
