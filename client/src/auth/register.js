import React, { useState } from "react";
import styles from "./register.module.scss";
import Role from "./component/role";
import Phone from "./component/phone";
import Email from "./component/email";
import Name from "./component/name";
import Birthday from "./component/birthday";
import Username from "./component/username";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../util/Mutation/auth";
import Message from "../components/message/message";

export default function Register() {
   const [role, setRole] = useState("");
   const [step, setStep] = useState(1);

   const [form, { data, error }] = useMutation(REGISTER);
   const onHandleRoles = (e) => {
      setRole(e.target.value);
   };

   const onHandleRegisterForm = (e) => {
      e.preventDefault();
      form({
         variables: {
            role: role,
            user: {
               email: null,
               username: null,
               fullname: null,
               password: null,
               phone: null,
               birthday: null,
            },
         },
         errorPolicy: "all",
      });
   };
   return (
      <div className={styles.container}>
         <form onSubmit={onHandleRegisterForm}>
            {error ? <Message message={error.message} /> : null}
            {step === 1 ? (
               <Role styles={styles} role={role} func={onHandleRoles} />
            ) : null}
            {step === 2 ? <Email styles={styles} /> : null}
            {step === 3 ? <Name styles={styles} /> : null}
            {step === 4 ? <Username styles={styles} /> : null}
            {step === 5 ? <Phone styles={styles} /> : null}
            {step === 6 ? <Birthday styles={styles} /> : null}
            <div className={styles.btngrp}>
               {step === 1 ? null : (
                  <button
                     disabled={step === 1}
                     type='button'
                     onClick={() => setStep(() => step - 1)}
                  >
                     <span>Prev</span>
                  </button>
               )}
               {step === 6 ? null : (
                  <button
                     disabled={step === 6}
                     type='button'
                     onClick={() => setStep(() => step + 1)}
                  >
                     <span>Next</span>
                  </button>
               )}
               {step === 6 ? (
                  <button type='submit'>
                     <span>Submit</span>
                  </button>
               ) : null}
            </div>
         </form>
      </div>
   );
}
