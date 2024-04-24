import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UsernameAvailability } from "../../util/Mutation/auth";
import Message from "../../components/message/message";
import InputForm from "../../components/form/input";

export default function Username({ styles, value, onChange }) {
  const [Check, { data, error }] = useMutation(UsernameAvailability);

  const onHandleCheckAvailabiltiy = (e) => {
    e.preventDefault();
    Check({
      variables: {
        username: value,
      },
      errorPolicy: "all",
    });
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Enter your Username</h2>
      {value}
      <div className={styles.number}>
        <InputForm
          onChange={onChange}
          placeHolder={"Enter your username"}
          type={"text"}
          value={value}
        />
        <button onClick={onHandleCheckAvailabiltiy} type="button">
          Check Availability
        </button>
      </div>
      <div className={styles.o}>
        {error ? (
          <Message message={error.message} error={error} />
        ) : data ? (
          "User is Available"
        ) : null}
      </div>
    </div>
  );
}
