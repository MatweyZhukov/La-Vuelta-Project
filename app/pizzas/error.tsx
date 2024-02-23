"use client";

//Global
import React from "react";

//Components
import { ErrorComponent } from "@/components/error/Error";

export default function Error() {
  return (
    <ErrorComponent
      errorText="Server Error! Check your internet connection, or wait a few time! Go to"
      errorImage="/fatal-error.png"
    />
  );
}
