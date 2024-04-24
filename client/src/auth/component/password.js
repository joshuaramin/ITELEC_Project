import React, { useState } from "react";
import InputForm from "../../components/form/input";
import { TbCheck, TbEye, TbEyeOff, TbX } from "react-icons/tb";

export default function Password({ styles, value, onChange }) {
  const [toggle, setToggle] = useState(false);

  const patterUppercaseLowerCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
  const patterCharacters = /^.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-].*$/;

  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Password</h2>
      <div className={styles.passwordContainer}>
        <InputForm
          type={toggle ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeHolder={"Enter your passwowrd"}
        />
        <button type="button" onClick={() => setToggle(() => !toggle)}>
          {toggle ? <TbEye size={23} /> : <TbEyeOff size={23} />}
        </button>
      </div>
      <div className={styles.patternCheck}>
        <span style={value.length >= 8 ? { color: "Green" } : { color: "red" }}>
          {value.length >= 8 ? <TbCheck size={23} /> : <TbX size={23} />}{" "}
          Password must be between 8 and 16 characters long.
        </span>
        <span
          style={
            patterUppercaseLowerCase.test(value)
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {patterUppercaseLowerCase.test(value) ? (
            <TbCheck size={23} />
          ) : (
            <TbX size={23} />
          )}{" "}
          Password must contain at least one uppercase and lowercase
        </span>
        <span
          style={
            patterCharacters.test(value) ? { color: "green" } : { color: "red" }
          }
        >
          {patterCharacters.test(value) ? (
            <TbCheck size={23} />
          ) : (
            <TbX size={23} />
          )}{" "}
          Password must contain one special character(!, @, #, $, etc)
        </span>
      </div>
    </div>
  );
}
