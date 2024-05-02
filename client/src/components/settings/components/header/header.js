import React from "react";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <h2>Settings</h2>
      <span>Manage your account settings</span>
    </div>
  );
}
