//Global
import React, { FC } from "react";
import { Metadata } from "next";

//Components
import { ProfilePage } from "@/components/profilePage/ProfilePage";

export const metadata: Metadata = {
  title: "La Vuelta | Profile page",
  description: "Created by Zhukov Matvey",
};

const Profile: FC = () => {
  return <ProfilePage />;
};

export default Profile;
