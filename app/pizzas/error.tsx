"use client";

//Global
import React from "react";

//Components
import { ErrorComponent } from "@/components/error/Error";

export default function Error() {
  const text =
    "Server Error! Check your internet connection, or wait a few time! Go to";

  return <ErrorComponent errorText={text} errorImage="/fatal-error.png" />;
}
