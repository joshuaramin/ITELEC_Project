import React, { useState } from "react";
import InputForm from "../../../../components/form/input";
import ButtonForm from "../../../../components/form/button";
import styles from "./password.module.scss";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useMutation } from "@apollo/client";
import { RESETPASSWORD } from "../../../../util/Mutation/auth";
import { DecodedToken } from "../../../../auth/token";
import Message from "../../../message/message";
import Form from "../../../form/form";

export default function Password() {
  const token = DecodedToken();
  const [toggle, setToggle] = useState(false);
  const [pass, setPassword] = useState({
    password: "",
    retype: "",
  });

  const [mutate, { error }] = useMutation(RESETPASSWORD);

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        userId: token,
        password: pass.password,
        retype: pass.retype,
      },
      onCompleted: () => {
        window.location.reload();
      },
      errorPolicy: "all",
    });
  };

  const onHandleToggleChange = () => {
    setToggle(() => !toggle);
  };

  const onHandlePasasword = (e) => {
    setPassword({ ...pass, password: e.target.value });
  };

  const onHandleRetypePassword = (e) => {
    setPassword({ ...pass, retype: e.target.value });
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={onHandleSubmitForm}>
        {error ? <Message message={error.message} error={error} /> : null}
        <h2>Change Password</h2>
        <div className={styles.password}>
          <InputForm
            type={toggle ? "text" : "password"}
            placeHolder={"New Password"}
            value={pass.password}
            onChange={onHandlePasasword}
          />
          <button type="button" onClick={onHandleToggleChange}>
            {toggle ? <TbEye size={23} /> : <TbEyeOff size={23} />}
          </button>
        </div>
        <div className={styles.password}>
          <InputForm
            type={toggle ? "text" : "password"}
            placeHolder={"Re-type Password"}
            value={pass.retype}
            onChange={onHandleRetypePassword}
          />
          <button type="button" onClick={onHandleToggleChange}>
            {toggle ? <TbEye size={23} /> : <TbEyeOff size={23} />}
          </button>
        </div>
        <ButtonForm name={"Submit"} />
      </Form>
    </div>
  );
}
