//Hooks
import { useTypedSelector } from "./useTypedSelector";

export function useAuth() {
  const { currentUser } = useTypedSelector((state) => state.user);

  const { email, token, id, name } = currentUser;

  return {
    isAuth: !!email,
    name,
    email,
    token,
    id,
  };
}
