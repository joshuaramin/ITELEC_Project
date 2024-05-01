import React from "react";
import styles from "./card.module.scss";
import { useNavigate } from "react-router-dom";

export default function Card({ id, subject, image, description, author }) {
  const route = useNavigate();

  return (
    <div key={id} className={styles.card}>
      <div>
        <img src={image} alt="" height={110} width={350} />
      </div>
      <h2>{subject}</h2>
      <p>{description}...</p>
      <span className={styles.author}>Author: {author}</span>
      <button onClick={() => route(`/course/${id}`)}>
        <span>Read</span>
      </button>
    </div>
  );
}
