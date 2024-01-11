//GLobal
import { FC } from "react";
import { Image } from "next/dist/client/image-component";
import Link from "next/dist/client/link";

//Types
import { ErrorComponentProps } from "@/types/types";

//Styles
import styles from "@/styles/error.module.css";

export const ErrorComponent: FC<ErrorComponentProps> = (errorProps) => {
  const { errorText, errorImage } = errorProps;

  return (
    <div className={styles.notFoundWrapper}>
      <Image width={300} height={300} src={errorImage} alt="erorr" />
      <p className={styles.notFoundText}>
        {errorText} <Link href="/">main</Link> page.
      </p>
    </div>
  );
};
