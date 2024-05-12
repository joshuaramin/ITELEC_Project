import React from "react";
import styles from "./user.module.scss";
import { TbMenu2 } from "react-icons/tb";
import Search from "../search/search";
export default function User({ close }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.navbtn} onClick={close}>
          <TbMenu2 size={23} />
        </button>
        <div className={styles.body}>
          <div className={styles.auth}>
            <a href="/auth/login">
              <span>Login</span>
            </a>
            <a href="/auth/register">
              <span>Sign In</span>
            </a>
          </div>
        </div>
      </div>

      <Search />
    </div>
  );
}
