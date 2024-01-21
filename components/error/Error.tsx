//GLobal
import React, { FC } from "react";
import { Image } from "next/dist/client/image-component";
import Link from "next/dist/client/link";

//Types
import { ErrorProps } from "@/types/types";

//Styles
import styles from "@/styles/error.module.css";

const Error: FC<ErrorProps> = (errorProps) => {
  const { errorText, errorImage } = errorProps;

  return (
    <div className={styles.notFoundWrapper}>
      <Image width={300} height={300} src={errorImage} alt="error" />
      <p className={styles.notFoundText}>
        {errorText} <Link href="/">main</Link> page.
      </p>
    </div>
  );
};

export { Error };
