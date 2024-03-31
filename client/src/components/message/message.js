import React from "react";
import styles from "./message.module.scss";
import { TbCircleX } from "react-icons/tb";

export default function Message({ message }) {
   return (
      <div className={styles.container}>
         <TbCircleX size={30} />
         <span>{message}</span>
      </div>
   );
}
