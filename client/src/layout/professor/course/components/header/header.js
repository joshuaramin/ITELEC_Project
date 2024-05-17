import React from "react";
import styles from "./header.module.scss";

export default function Header({ image }) {
  return (
    <div className={styles.header}>
      <div className={styles.bgCourseImage}>
        <img
          src={image}
          alt=""
          height={400}
          style={{
            width: "100%",
            objectFit: "cover",
            imageResolution: "inherit",
          }}
        />
      </div>
    </div>
  );
}
