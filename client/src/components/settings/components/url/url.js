import React from "react";
import styles from "./url.module.scss";

const urls = [
  {
    name: "Account Details",
    value: "details",
  },
  {
    name: "Change Password",
    value: "password",
  },
  {
    name: "Change Email Address",
    value: "email",
  },
];

export default function URL({ values, onHandle }) {
  return (
    <div className={styles.container}>
      {urls.map(({ name, value }) => (
        <button
          className={value === values ? styles.active : styles.deactive}
          onClick={onHandle}
          key={name}
          value={value}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
