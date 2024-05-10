import React, { useState } from "react";
import styles from "./settings.module.scss";
import Header from "./components/header/header";
import URL from "./components/url/url";
import Password from "./components/password/password";
import Username from "./components/username/username";

export default function Settings() {
  const [value, setVaue] = useState("password");

  const onHandleChangeValue = (e) => {
    setVaue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Header />
      <URL values={value} onHandle={onHandleChangeValue} />
      <div className={styles.component}>
        {value === "password" ? <Password /> : null}
        {value === "username" ? <Username /> : null}
      </div>
    </div>
  );
}
