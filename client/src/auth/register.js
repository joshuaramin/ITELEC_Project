import React, { useState } from "react";
import styles from "./register.module.scss";

const roles = [
   {
      name: "Professor",
      value: "professor",
      description:
         "Our dedicated professors bring expertise and passion to guide students through our Free Online Academy's courses, fostering a culture of learning excellence.",
   },
   {
      name: "Student",
      value: "student",
      description:
         "You'll explore diverse subjects and engage with a vibrant community, all without any cost or commitment.",
   },
];

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
               <div className={styles.mainContainer}>
                  <h2>Are you a Professor or Student?</h2>
                  {roles.map(({ name, value, description }) => (
                     <div key={name} className={styles.roles}>
                        <div className={styles.inlb}>
                           <input
                              type='radio'
                              value={value}
                              onChange={onHandleRoles}
                              checked={value === role ? true : false}
                           />
                           <label>{name}</label>
                        </div>
                        <span>{description}</span>
                     </div>
                  ))}
               </div>
            ) : null}
            {step === 2 ? (
               <div className={styles.mainContainer}>
                  <h2>Enter your Phone Nubmer</h2>
                  <div className={styles.number}>
                     <div className={styles.countryCode}>
                        <span>+63</span>
                     </div>
                     <input
                        maxLength={10}
                        type='text'
                        placeholder='9499144792'
                     />
                  </div>
               </div>
            ) : null}

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
