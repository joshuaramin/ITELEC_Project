import React, { useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import styles from "./filter.module.scss";

const filData = [
  {
    name: "Newest",
    value: "asc",
  },
  {
    name: "Oldest",
    value: "desc",
  },
];

export default function Filter({
  orders,
  onValueToggle,
  toggle,
  onHandleFilter,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <span>{orders === "asc" ? "Newest" : "Oldest"}</span>
        <button className={styles.asd} onClick={toggle}>
          {onValueToggle ? (
            <TbChevronUp size={23} />
          ) : (
            <TbChevronDown size={23} />
          )}
        </button>
      </div>
      {onValueToggle ? (
        <div className={styles.controller}>
          {filData.map(({ name, value }) => (
            <div className={styles.controllerContainer}>
              <button onClick={onHandleFilter} value={value}>
                {name}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
