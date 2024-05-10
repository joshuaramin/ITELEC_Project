import React, { useState } from "react";
import styles from "./username.module.scss";
import InputForm from "../../../form/input";
import ButtonForm from "../../../form/button";
import { useMutation } from "@apollo/client";
import { UPDATEUSERNAME } from "../../../../util/Mutation/auth";
import { DecodedToken } from "../../../../auth/token";
import Message from "../../../message/message";
import Form from "../../../form/form";

export default function Username() {
  const [username, setUsername] = useState("");

  const token = DecodedToken();
  const [mutate, { error }] = useMutation(UPDATEUSERNAME);

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        userId: token,
        username,
      },
      onCompleted: () => {
        window.location.reload();
      },
      errorPolicy: "all",
    });
  };

  const onHandleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={onHandleSubmitForm}>
        {error ? <Message message={error.message} error={error} /> : null}
        <h2>Change Username</h2>
        <InputForm
          onChange={onHandleUsernameChange}
          value={username}
          type={"text"}
          placeHolder={"Username"}
        />
        <ButtonForm name={"Submit"} />
      </Form>
    </div>
  );
}
