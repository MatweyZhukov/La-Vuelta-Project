"use client";

//Global
import React, { FC, useState, useMemo, useCallback } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

//Types
import { IPizzaTileItem, PizzaTypes } from "@/types/types";

//Components
import { PizzaTile } from "../pizzaTile/PizzaTile";

//Styles
import styles from "@/styles/pizzasPage.module.css";

const PizzaTilesList: FC<{ tiles: IPizzaTileItem[] }> = ({ tiles }) => {
  const [value, setValue] = useState<string>(""),
    [pizzaType, setPizzaType] = useState<PizzaTypes>("all");

  const changePizzaType = (
    event: React.MouseEvent<HTMLElement>,
    newType: PizzaTypes
  ) => {
    newType && setPizzaType(newType);
  };

  const searchTiles = useCallback(() => {
    if (!value.length) {
      return tiles;
    }

    return tiles.filter(tile =>
      tile.pizzaTitle.toLowerCase().includes(value.toLowerCase())
    );
  }, [tiles, value]);

  const filterTiles = useCallback(() => {
    const tiles = searchTiles();

    if (pizzaType === "all") {
      return tiles;
    }

    return tiles.filter(tile => tile.pizzaType === pizzaType);
  }, [pizzaType, searchTiles]);

  const newTiles = useMemo(() => filterTiles(), [filterTiles]);

  return (
    <>
      <section className={styles.searchPanel}>
        <input
          placeholder="Search your pizza..."
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <ToggleButtonGroup
          className={styles.toggleButtonGroup}
          color="warning"
          value={pizzaType}
          exclusive
          onChange={changePizzaType}
        >
          <ToggleButton className={styles.toggleButton} value={"all"}>
            all
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={"kids"}>
            kids
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={"meat"}>
            meat
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={"vegan"}>
            vegan
          </ToggleButton>
        </ToggleButtonGroup>
      </section>

      <ul className={styles.pizzaTilesWrapper}>
        {newTiles.length ? (
          newTiles.map(tile => <PizzaTile key={tile.id} pizza={tile} />)
        ) : (
          <h1 className={styles.pizzasPageTitle}>Nothing found...</h1>
        )}
      </ul>
    </>
  );
};

export { PizzaTilesList };
