"use client";

//Global
import { FC, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

//Types
import { IPizzaTileItem, PizzaTypes } from "@/types/types";

//Components
import { PizzaTile } from "../PizzaTile/PizzaTile";

//Styles
import styles from "../../styles/pizzasPage.module.css";

const PizzaTilesList: FC<{ tiles: IPizzaTileItem[] }> = ({ tiles }) => {
  const [value, setValue] = useState<string>(""),
    [pizzaType, setPizzaType] = useState<PizzaTypes>("all");

  const changePizzaType = (
    event: React.MouseEvent<HTMLElement>,
    newType: PizzaTypes
  ) => {
    newType && setPizzaType(newType);
  };

  const searchTiles = () => {
    if (!value.length) {
      return tiles;
    }

    return tiles.filter((tile) =>
      tile.pizzaTitle.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filterTiles = () => {
    const tiles = searchTiles();

    if (pizzaType === "all") {
      return tiles;
    }

    return tiles.filter((tile) => tile.pizzaType === pizzaType);
  };

  const newTiles = filterTiles(),
    pizzaTypeButtons: PizzaTypes[] = ["all", "kids", "meat", "vegan"];

  return (
    <>
      <section className={styles.searchPanel}>
        <input
          placeholder="Search your pizza..."
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <ToggleButtonGroup
          className={styles.toggleButtonGroup}
          color="warning"
          value={pizzaType}
          exclusive
          onChange={changePizzaType}
        >
          {pizzaTypeButtons.map((type, index) => (
            <ToggleButton
              key={index}
              className={styles.toggleButton}
              value={type}
            >
              {type.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </section>

      <ul className={styles.pizzaTilesWrapper}>
        {newTiles.length ? (
          newTiles.map((tile) => <PizzaTile key={tile.id} pizza={tile} />)
        ) : (
          <h1>Nothing found...</h1>
        )}
      </ul>
    </>
  );
};

export { PizzaTilesList };
