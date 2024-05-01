import React, { useState } from "react";
import styles from "./student.module.scss";
import Headers from "./component/header/header";
import Course from "./component/course/course";
import Filter from "./component/course/filter/filter";

export default function Student() {
  const [value, setValue] = useState("asc");
  const [toggle, setToggle] = useState(false);

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };

  const onHandleChangeValue = (e) => {
    setValue(e.target.value);
    setToggle(false);
  };

  return (
    <div className={styles.container}>
      <Headers />
      <div className={styles.course}>
        <div className={styles.body}>
          <h2 className={styles.title}>My Library</h2>
          <Filter
            orders={value}
            onHandleFilter={onHandleChangeValue}
            toggle={onHandleToggle}
            onValueToggle={toggle}
          />
        </div>
        <Course value={value} />
      </div>
    </div>
  );
}
