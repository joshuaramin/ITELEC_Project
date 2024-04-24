import React from "react";
import InputForm from "../../components/form/input";

export default function Name({ styles, value, onChange }) {
  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Fullname</h2>
      <div className={styles.number}>
        <InputForm
          type={"text"}
          placeHolder={"Enter your Fullname"}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
