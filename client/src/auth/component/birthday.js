import React, { useState } from "react";
import { day, month, year } from "./data";
export default function Birthday({
  styles,
  onMonthValue,
  onYearValue,
  onDayValue,
  onMonthChange,
  onYearChange,
  onDayChange,
}) {
  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Birthday</h2>

      <div className={styles.calendar}>
        <div className={styles.months}>
          <label>Month</label>
          <input type="text" value={onMonthValue} onChange={onMonthChange} />
          <div>
            {month.map((name, i) => (
              <button
                value={`${i + 1 > 9 ? i + 1 : `0${i + 1}`}`}
                onClick={onMonthChange}
                type="button"
                key={name}
              >
                {`${i + 1 > 9 ? i + 1 : `0${i + 1}`}`}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.days}>
          {" "}
          <label>Day</label>
          <input type="text" value={onDayValue} onChange={onDayChange} />
          <div>
            {day.map((name) => (
              <button
                value={name}
                onClick={onDayChange}
                type="button"
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.years}>
          <label>Year</label>
          <input type="text" value={onYearValue} onChange={onYearChange} />
          <div>
            {year.map((name) => (
              <button
                value={name}
                onClick={onYearChange}
                type="button"
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
