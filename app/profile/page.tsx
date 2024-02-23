//Global
import React from "react";
import { Metadata, NextPage } from "next";

//Components
import { ProfilePage } from "@/components/profilePage/ProfilePage";

export const metadata: Metadata = {
  title: "La Vuelta | Profile page",
  description: "Created by Zhukov Matvey",
};

const Profile: NextPage = () => {
  return <ProfilePage />;
};

export default Profile;
