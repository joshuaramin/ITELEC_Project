import React from "react";

export default function FilterCard({ name, value, styles, onHandleFilter }) {
  return (
    <div className={styles.controllerContainer}>
      <button onClick={onHandleFilter} value={value}>
        {name}
      </button>
    </div>
  );
}
