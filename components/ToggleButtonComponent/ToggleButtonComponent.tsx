"use client";

//Global
import { FC } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

//Hooks
import { useTyppedSelector } from "@/hooks/useTyppedSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import {
  setPizzaSize,
  setDoughSize,
} from "@/GlobalRedux/reducers/pizzaOptionsSlice";

//Styles
import styles from "../../styles/pizzaSinglePage.module.css";

const ToggleButtonComponent: FC = () => {
  const { doughSizeOption, pizzaSizeOption } = useTyppedSelector(
    (state) => state.pizzaOptions
  );

  const dispatch = useAppDispatch();

  const changePizzaSize = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    newSize && dispatch(setPizzaSize(newSize));
  };

  const changePizzaDough = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    newSize && dispatch(setDoughSize(newSize));
  };

  return (
    <div data-toggle>
      <div data-toggle-single>
        <p data-text-size>Pizza size:</p>
        <ToggleButtonGroup
          className={styles.toggleButtonGroup}
          color="warning"
          value={pizzaSizeOption}
          exclusive
          onChange={changePizzaSize}
        >
          <ToggleButton className={styles.toggleButton} value={24}>
            24 cm
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={30}>
            30 cm
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={35}>
            25 cm
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div data-toggle-single>
        <p data-text-dough>Dough size:</p>
        <ToggleButtonGroup
          className={styles.toggleButtonGroup}
          color="warning"
          value={doughSizeOption}
          exclusive
          onChange={changePizzaDough}
        >
          <ToggleButton className={styles.toggleButton} value={"traditional"}>
            traditional
          </ToggleButton>
          <ToggleButton className={styles.toggleButton} value={"thin"}>
            thin
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export { ToggleButtonComponent };
