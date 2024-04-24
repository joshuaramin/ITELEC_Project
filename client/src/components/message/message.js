import React from "react";
import styles from "./message.module.scss";
import { TbCircleCheck, TbCircleX, TbExclamationCircle } from "react-icons/tb";

export default function Message({ message, error, data }) {
  return (
    <div className={styles.error}>
      <TbExclamationCircle size={23} />
      <span>{message}</span>
    </div>
  );
}
