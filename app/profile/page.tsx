//Global
import { FC } from "react";
import { Metadata } from "next";

//Components
import { ProfilePageComponent } from "@/components/ProfilePageComponent/ProfilePageComponent";

export const metadata: Metadata = {
  title: "La Vuelta | Profile page",
  description: "Created by Zhukov Matvey",
};

const Profile: FC = () => {
  return <ProfilePageComponent />;
};

export default Profile;
