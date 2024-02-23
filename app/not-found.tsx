//Global
import React from "react";

//Components
import { ErrorComponent } from "@/components/error/Error";

export default function NotFound() {
  const text = "404 Error! The page matching your request was not found. Go to";

  return <ErrorComponent errorText={text} errorImage="/error-icon.png" />;
}
