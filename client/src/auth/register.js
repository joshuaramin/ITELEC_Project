import React, { useState } from "react";
import styles from "./register.module.scss";
import Role from "./component/role";
import Phone from "./component/phone";
import Email from "./component/email";

export default function Register() {
   const [role, setRole] = useState("");
   const [step, setStep] = useState(1);

   const onHandleRoles = (e) => {
      setRole(e.target.value);
   };
   return (
      <div className={styles.container}>
         <form>
            {step === 1 ? (
               <Role styles={styles} role={role} func={onHandleRoles} />
            ) : null}
            {step === 2 ? <Phone styles={styles} /> : null}
            {step === 3 ? <Email styles={styles} /> : null}
            <div className={styles.btngrp}>
               {" "}
               {step === 1 ? null : (
                  <button
                     disabled={step === 1}
                     type='button'
                     onClick={() => setStep(() => step - 1)}
                  >
                     <span>Prev</span>
                  </button>
               )}
               <button type='button' onClick={() => setStep(() => step + 1)}>
                  <span>Next</span>
               </button>
               {step === 5 ? <button>Submit</button> : null}
            </div>
         </form>
      </div>
   );
}
