"use client";

//Global
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToastMessage } from "@/app/layout";

//Hooks
import { useAppDispatch } from "@/hooks/useAppDispatch";

//Actions
import { resetUser } from "@/GlobalRedux/reducers/userSlice";

//Components
import { Spinner } from "../Spinner/Spinner";

//Hooks
import { useAuth } from "@/hooks/useAuth";

const ProfilePageComponent: FC = () => {
  const { email, isAuth, name } = useAuth();

  const { push } = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      push("/profile");
    }

    //eslint-disable-next-line
  }, [isAuth]);

  return (
    <>
      {!isAuth ? (
        <Spinner />
      ) : (
        <>
          <h1>Welcome!</h1>

          <p>Your email: {email}</p>

          <p>Your name: {name}</p>

          <button
            onClick={() => {
              dispatch(resetUser());
              showToastMessage("success", "You've successfully logged out!");
              push("/");
            }}
          >
            log out
          </button>
        </>
      )}
    </>
  );
};

export { ProfilePageComponent };
