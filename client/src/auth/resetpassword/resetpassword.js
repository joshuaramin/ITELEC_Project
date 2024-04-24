import React, { useEffect, useState } from "react";
import styles from "./resetpassword.module.scss";
import ButtonForm from "../../components/form/button";
import InputForm from "../../components/form/input";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RESETPASSWORD } from "../../util/Mutation/auth";
import Message from "../../components/message/message";
import { TbEye, TbEyeOff } from "react-icons/tb";

export default function ResetPassword() {
  const params = useParams();
  const route = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [pass, setPass] = useState({
    password: "",
    retype: "",
  });

  const [message, setMessage] = useState("");
  const [mutate, { data, error }] = useMutation(RESETPASSWORD, {
    variables: {
      password: pass.password,
      retype: pass.retype,
      userId: params.id,
    },
    onCompleted: () => {
      setMessage(
        "Your password has been successfully reset. For security reasons, we recommend keeping your new password confidential. If you have any further questions or concerns, please don't hesitate to contact our support team."
      );
    },
    errorPolicy: "all",
  });

  const onHanldePasswordChange = (e) => {
    setPass({ ...pass, password: e.target.value });
  };

  const onHandleRetypeChange = (e) => {
    setPass({ ...pass, retype: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const onToggleBtn = () => {
    setToggle(() => !toggle);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onHandleSubmit}>
        <h2>Reset Password</h2>
        {error ? <Message message={error.message} error={error} /> : null}
        {message === "" ? (
          <>
            <div className={styles.password}>
              <InputForm
                value={pass.password}
                type={toggle ? "text" : "password"}
                onChange={onHanldePasswordChange}
                placeHolder={"Password"}
              />
              <button type="button" onClick={onToggleBtn}>
                {toggle ? <TbEye size={23} /> : <TbEyeOff size={23} />}
              </button>
            </div>
            <div className={styles.password}>
              <InputForm
                value={pass.retype}
                type={toggle ? "text" : "password"}
                onChange={onHandleRetypeChange}
                placeHolder={"Retype Password"}
              />
              <button type="button" onClick={onToggleBtn}>
                {toggle ? <TbEye size={23} /> : <TbEyeOff size={23} />}
              </button>
            </div>
            <ButtonForm name={"Submit"} />
          </>
        ) : (
          <div className={styles.successPasswordUpdate}>
            <span>{message}</span>
            <button onClick={() => route("/auth/login")}>
              Go Back to Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
