import React, { useState } from "react";
import styles from "./forgotpassword.module.scss";
import ButtonForm from "../../components/form/button";
import InputForm from "../../components/form/input";
import { FindMyUniqueEmailAddress } from "../../util/Mutation/auth";
import { gql, isApolloError, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Message from "../../components/message/message";
import Form from "../../components/form/form";

export default function ForgotPassword() {
  const router = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const onHandleEmailAddressChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const [message, setMessage] = useState("");

  const [mutate, { data, error }] = useMutation(FindMyUniqueEmailAddress);

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        email: emailAddress,
      },
      onCompleted: () => {
        setMessage(
          "Your password reset link has been successfully sent to your email. Please check your inbox (and spam folder, just in case) for further instructions. Should you encounter any issues or need assistance, feel free to reach out to our support team."
        );
      },
      errorPolicy: "all",
    });
  };

  const onHandleGoBackToSign = () => {
    router("/auth/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Reset Password</h2>
        {message ? null : (
          <p>
            Please Enter your email associated to your account. Once you do that
            we will send you a reset password link to your email
          </p>
        )}
      </div>
      <Form onSubmit={onHandleSubmitForm}>
        {error ? <Message message={error.message} error={error} /> : null}
        {message ? (
          <div className={styles.successL}>
            <span>{message}</span>
            <button
              className={styles.cancelBtn}
              onClick={onHandleGoBackToSign}
              type="button"
            >
              Go Back
            </button>
          </div>
        ) : (
          <>
            <InputForm
              onChange={onHandleEmailAddressChange}
              placeHolder={"Email Address"}
              type={"email"}
              value={emailAddress}
            />
            <ButtonForm name={"Reset Password"} />
            <button
              className={styles.cancelBtn}
              onClick={onHandleGoBackToSign}
              type="button"
            >
              Cancel
            </button>
          </>
        )}
      </Form>
    </div>
  );
}
