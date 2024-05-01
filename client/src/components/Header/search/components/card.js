import React from "react";
import styles from "./card.module.scss";
import { useNavigate } from "react-router-dom";

export default function Card({ id, title, image, language }) {
  const router = useNavigate();

  return (
    <div className={styles.container} onClick={() => router(`/course/${id}`)}>
      <div className={styles.avatar}>
        <img src={image} alt="" height={30} width={100} />
      </div>
      <div className={styles.information}>
        <span>{title}</span>
        <span className={styles.language}>Language: {language}</span>
      </div>
    </div>
  );
}
