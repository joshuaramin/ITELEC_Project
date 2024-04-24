import React from "react";
import styles from "./input.module.scss";
export default function InputForm({ type, onChange, placeHolder, value, max }) {
  return (
    <input
      type={type}
      value={value}
      className={styles.inputform}
      onChange={onChange}
      placeholder={placeHolder}
      maxLength={max}
    />
  );
}
