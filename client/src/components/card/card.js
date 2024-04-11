import React from "react";
import styles from "./card.module.scss";

export default function Card({ name, author }) {
   return (
      <div className={styles.container}>
         <div className={styles.bgCourse}></div>
         <div className={styles.information}>
            <h2 className={styles.title}>
               {name.length > 60 ? name : `${name.slice(0, 40)}`}
            </h2>
            <span className={styles.author}>{author}</span>
         </div>
      </div>
   );
}
