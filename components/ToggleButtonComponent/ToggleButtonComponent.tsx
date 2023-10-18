"use client";

//Global
import { FC } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

//Hooks
import { useAppDispatch, useTyppedSelector } from "@/hooks/useTyppedSelector";

//Actions
import {
  setPizzaSize,
  setDoughSize,
} from "@/GlobalRedux/reducers/pizzaOptionsSlice";

//Styles
import styles from "../../styles/styles.module.css";

const ToggleButtonComponent: FC = () => {
  const { doughSizeOption, pizzaSizeOption } = useTyppedSelector(
    (state) => state.pizzaOptions
  );

  const dispatch = useAppDispatch();

  const buttonsSize = ["small", "middle", "large"],
    buttonsDough = ["traditional", "thin"];

  const changePizzaSize = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    dispatch(setPizzaSize(newSize));
  };

  const changePizzaDough = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    dispatch(setDoughSize(newSize));
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
          {buttonsSize.map((size, index) => (
            <ToggleButton
              key={index}
              className={styles.toggleButton}
              value={size}
            >
              {size}
            </ToggleButton>
          ))}
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
          {buttonsDough.map((dough, index) => (
            <ToggleButton
              key={index}
              className={styles.toggleButton}
              value={dough}
            >
              {dough}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export { ToggleButtonComponent };
