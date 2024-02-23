//Types
import { IInputsForm } from "@/types/types";

export const signUpArrayInputs: IInputsForm[] = [
  {
    inputType: "text",
    name: "name",
    minLength: 2,
    minLengthText: "It's a too short name!",
    inputPlaceholder: "Enter your name...",
  },
  {
    inputType: "email",
    name: "email",
    minLength: 8,
    minLengthText: "It's a too short email!",
    inputPlaceholder: "Enter your email...",
  },
  {
    inputType: "password",
    name: "password",
    minLength: 6,
    maxLength: 30,
    minLengthText: "No less then 6 symbols!",
    maxLengthText: "No more then 30 symbols!",
    inputPlaceholder: "Enter your password...",
  },
];

export const logInArrayInputs: IInputsForm[] = [
  {
    inputType: "email",
    name: "email",
    minLength: 8,
    minLengthText: "It's a too short email!",
    inputPlaceholder: "Enter your email...",
  },
  {
    inputType: "password",
    name: "password",
    minLength: 6,
    maxLength: 30,
    minLengthText: "No less then 6 symbols!",
    maxLengthText: "No more then 30 symbols!",
    inputPlaceholder: "Enter your password...",
  },
];
