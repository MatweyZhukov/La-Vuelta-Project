"use client";

//Components
import { ErrorComponent } from "@/components/ErrorComponent/ErrorComponent";

export default function Error() {
  const text =
    "Server Error! Check your internet conection, or wait a few time! Go to";

  return <ErrorComponent errorText={text} errorImage="/fatal-error.png" />;
}
