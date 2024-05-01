import React from "react";
import styles from "./header.module.scss";
import Profile from "../../../../components/Header/profile/profile";
import Cookies from "js-cookie";
export default function Headers() {
  const token = Cookies.get("access_token");

  return (
    <div className={styles.container}>
      <Profile token={token} />
    </div>
  );
}
