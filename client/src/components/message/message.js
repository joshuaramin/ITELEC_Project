import React from "react";
import styles from "./message.module.scss";
import {
  TbCircleCheck,
  TbCircleX,
  TbExclamationCircle,
  TbX,
} from "react-icons/tb";

export default function Message({ message, error, data, close }) {
  return error ? (
    <div className={styles.error}>
      <TbExclamationCircle size={23} />
      <span>{message}</span>
    </div>
  ) : (
    <div className={styles.success}>
      <span>{message}</span>
      <button onClick={close}>
        <TbX size={20} />
      </button>
    </div>
  );
}
