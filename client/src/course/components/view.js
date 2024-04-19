import React from "react";
import styles from "./view.module.scss";
import { TbBook2 } from "react-icons/tb";
export default function View({ language, count, title }) {
   return (
      <div className={styles.container}>
         <h2>{title}</h2>
         <div className={styles.previewContainer}>
            <span></span>
            <span>
               <TbBook2 size={23} />
               {count} lesson
            </span>
            <span></span>
         </div>
         <button>Enroll</button>
      </div>
   );
}
