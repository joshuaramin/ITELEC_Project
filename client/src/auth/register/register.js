import React, { useState } from "react";
import styles from "./register.module.scss";
import Role from "../component/role";
import Phone from "../component/phone";
import Email from "../component/email";
import Name from "../component/name";
import Birthday from "../component/birthday";
import Username from "../component/username";
import Message from "../../components/message/message";
import ButtonForm from "../../components/form/button";
import Password from "../component/password";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../util/Mutation/auth";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/form";

export default function Register() {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1);
  const route = useNavigate();

  const [birthday, setBirthday] = useState({
    month: "",
    day: "",
    year: "",
  });

  const [users, setUsers] = useState({
    email: "",
    username: "",
    passwowrd: "",
    phone: "",
    fullname: "",
    birthday: "",
  });

  const onHandleMonthChange = (e) => {
    setBirthday({ ...birthday, month: e.target.value });
  };

  const onHandleYearChange = (e) => {
    setBirthday({ ...birthday, year: e.target.value });
  };

  const onHandleDayChange = (e) => {
    setBirthday({ ...birthday, day: e.target.value });
  };

  const onHandleEmailAddressChange = (e) => {
    setUsers({ ...users, email: e.target.value });
  };

  const onHandleUsernameChange = (e) => {
    setUsers({ ...users, username: e.target.value });
  };

  const onHandlePasswordChange = (e) => {
    setUsers({ ...users, passwowrd: e.target.value });
  };

  const onHandleFullnameChange = (e) => {
    setUsers({ ...users, fullname: e.target.value });
  };

  const onHandlePhoneChange = (e) => {
    setUsers({ ...users, phone: e.target.value });
  };
  const [form, { data, error }] = useMutation(REGISTER);
  const onHandleRoles = (e) => {
    setRole(e.target.value);
  };

  const [message, setMessage] = useState("");
  const onHandleRegisterForm = (e) => {
    e.preventDefault();
    form({
      variables: {
        role: role,
        user: {
          email: users.email,
          username: users.username,
          fullname: users.fullname,
          password: users.passwowrd,
          phone: `+63${users.phone}`,
          birthday: `${birthday.year}-${birthday.month}-${birthday.day}`,
        },
      },
      onCompleted: () => {
        setMessage(
          "Congratulations on successfully registering! An email containing a verification link has been sent to the address you provided. Please check your inbox and follow the instructions to verify your account. Welcome aboard!"
        );
      },
      errorPolicy: "all",
    });
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={onHandleRegisterForm}>
        {error ? <Message message={error.message} /> : null}
        {message ? (
          <div className={styles.successPasswordUpdate}>
            <h2>Create Account</h2>
            <span>{message}</span>
            <button onClick={() => route("/auth/login")}>
              Go Back to Login
            </button>
          </div>
        ) : (
          <>
            {step === 1 ? (
              <Role styles={styles} role={role} func={onHandleRoles} />
            ) : null}
            {step === 2 ? (
              <Email
                styles={styles}
                value={users.email}
                onChange={onHandleEmailAddressChange}
              />
            ) : null}
            {step === 3 ? (
              <Name
                styles={styles}
                value={users.fullname}
                onChange={onHandleFullnameChange}
              />
            ) : null}
            {step === 4 ? (
              <Username
                styles={styles}
                value={users.username}
                onChange={onHandleUsernameChange}
              />
            ) : null}
            {step === 5 ? (
              <Password
                styles={styles}
                value={users.passwowrd}
                onChange={onHandlePasswordChange}
              />
            ) : null}
            {step === 6 ? (
              <Phone
                styles={styles}
                value={users.phone}
                onChange={onHandlePhoneChange}
              />
            ) : null}
            {step === 7 ? (
              <Birthday
                styles={styles}
                value={users.birthday}
                onMonthValue={birthday.month}
                onYearValue={birthday.year}
                onDayValue={birthday.day}
                onMonthChange={onHandleMonthChange}
                onYearChange={onHandleYearChange}
                onDayChange={onHandleDayChange}
              />
            ) : null}
            <div className={styles.btngrp}>
              {step === 1 ? null : (
                <button
                  disabled={step === 1}
                  type="button"
                  onClick={() => setStep(() => step - 1)}
                >
                  <span>Prev</span>
                </button>
              )}
              {step === 7 ? null : (
                <button
                  disabled={step === 7}
                  type="button"
                  onClick={() => setStep(() => step + 1)}
                >
                  <span>Next</span>
                </button>
              )}
              {step === 7 ? <ButtonForm name={"Submit"} /> : null}
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
