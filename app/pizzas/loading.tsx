//Global
import React from "react";
import { NextPage } from "next";

//Components
import { Spinner } from "@/components/spinner/Spinner";

const loading: NextPage = () => {
  return <Spinner />;
};

export default loading;
