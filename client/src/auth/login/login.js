import React, { useState } from "react";
import styles from "./login.module.scss";
import { LOGINAUTHENTICATIOn } from "../../util/Mutation/auth";
import { useMutation } from "@apollo/client";
import Message from "../../components/message/message";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/form/input";
import ButtonForm from "../../components/form/button";
import Form from "../../components/form/form";

export default function Login() {
  const router = useNavigate();

  const [user, setUsers] = useState({
    email: "",
    password: "",
  });

  const [mutate, { data, loading, error, reset }] =
    useMutation(LOGINAUTHENTICATIOn);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    mutate({
      variables: {
        username: user.email,
        password: user.password,
      },
      onCompleted: (data) => {
        Cookies.set("access_token", data.login.token, {
          expires: 60 * 60 * 7 * 24,
          path: "/",
          sameSite: "none",
          secure: true,
        });

        const getCookies = Cookies.get("access_token");

        const decodeToken = jwtDecode(getCookies);
        router(`/dashboard/${decodeToken.role}/course`);
        window.location.reload();
      },
      fetchPolicy: "network-only",
      errorPolicy: "all",
    });
  };

  const onHandleEmailAddressChange = (e) => {
    setUsers({ ...user, email: e.target.value });
  };

  const onHandlePasswordChange = (e) => {
    setUsers({ ...user, password: e.target.value });
  };

  if (error) {
    console.log(error);
  }
  return (
    <div className={styles.container}>
      <Form onSubmit={onHandleSubmit}>
        <h2>School Academy</h2>
        {error ? <Message message={error.message} error={error} /> : null}
        <InputForm
          type={"text"}
          onChange={onHandleEmailAddressChange}
          value={user.email}
          placeHolder={"Username"}
        />
        <InputForm
          type={"password"}
          onChange={onHandlePasswordChange}
          value={user.password}
          placeHolder={"Password"}
        />
        <div className={styles.fp}>
          <a href="/auth/forgotpassword">Forgot Password?</a>
        </div>
        <ButtonForm name={"Submit"} />
        <div className={styles.signup}>
          <span>
            Don't have an account yet? <a href="/auth/register">Sign Up.</a>
          </span>
        </div>
      </Form>
    </div>
  );
}
