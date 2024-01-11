//Components
import { ErrorComponent } from "@/components/ErrorComponent/ErrorComponent";

export default function NotFound() {
  const text = "404 Error! The page matching your request was not found. Go to";

  return <ErrorComponent errorText={text} errorImage="/error-icon.png" />;
}
