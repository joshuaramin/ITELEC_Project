import React, { useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import styles from "./filter.module.scss";
import FilterCard from "./filterCard";

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
            <FilterCard
              key={name}
              value={value}
              name={name}
              onHandleFilter={onHandleFilter}
              styles={styles}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
