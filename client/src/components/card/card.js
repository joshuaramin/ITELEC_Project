import React from "react";
import styles from "./card.module.scss";
import { TbBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function Card({ id, name, author, count, tags, image }) {
  const router = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.bgCourse}>
        <img src={image} alt="" height={105} width={350} />
      </div>
      <div className={styles.information}>
        <h2 onClick={() => router(`/course/${id}`)} className={styles.title}>
          {name.length < 25 ? name : `${name.slice(0, 20)}....`}
        </h2>
        <span className={styles.toggle}>{name}</span>
        <span className={styles.author}>{author}</span>
      </div>
      <div className={styles.lesson}>
        <TbBook size={23} /> <span> {count}</span>
      </div>
    </div>
  );
}
