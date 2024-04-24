import React from "react";
import InputForm from "../../components/form/input";
export default function Email({ styles, value, onChange }) {
  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Email Address</h2>
      <div className={styles.number}>
        <InputForm
          placeHolder={"Enter your Email Address"}
          type={"text"}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
