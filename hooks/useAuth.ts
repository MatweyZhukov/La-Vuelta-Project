"use client";

//Hooks
import { useTyppedSelector } from "./useTyppedSelector";

export function useAuth() {
  const { currentUser } = useTyppedSelector((state) => state.user);

  const { email, token, id, name } = currentUser;

  return {
    isAuth: !!email,
    name,
    email,
    token,
    id,
  };
}
