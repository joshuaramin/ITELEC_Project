import React, { useState } from "react";
import styles from "./settings.module.scss";
import Header from "./components/header/header";
import URL from "./components/url/url";

export default function Settings() {
  const [value, setVaue] = useState("details");

  const onHandleChangeValue = (e) => {
    setVaue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Header />
      <URL values={value} onHandle={onHandleChangeValue} />
    </div>
  );
}
