import React from "react";
import InputForm from "../../components/form/input";

export default function Phone({ styles, value, onChange }) {
  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Phone Number</h2>
      <div className={styles.number}>
        <div className={styles.countryCode}>
          <span>+63</span>
        </div>
        <InputForm
          max={10}
          onChange={onChange}
          value={value}
          type={"tel"}
          placeHolder={"9499144792"}
        />
      </div>
    </div>
  );
}
