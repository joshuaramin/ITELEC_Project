import React from "react";
import styles from "./lesson.module.scss";
import { TbPlus } from "react-icons/tb";

export default function Lesson({ onHandleTogglesson }) {
  return (
    <div className={styles.lesson}>
      <h2>Lessons</h2>
      <button onClick={onHandleTogglesson}>
        <TbPlus size={20} />
        <span>Add Lesson</span>
      </button>
    </div>
  );
}
