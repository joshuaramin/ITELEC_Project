import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UsernameAvailability } from "../../util/Mutation/auth";
import Message from "../../components/message/message";

export default function Username({ styles }) {
   const [username, setUsername] = useState("");

   const [Check, { data, error }] = useMutation(UsernameAvailability);

   const onHandleCheckAvailabiltiy = (e) => {
      e.preventDefault();
      Check({
         variables: {
            username,
         },
         errorPolicy: "all",
      });
   };
   return (
      <div className={styles.mainContainer}>
         <h2>Enter your Username</h2>
         <div className={styles.number}>
            <input
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               type='text'
               placeholder='johndoe123'
            />
            <button onClick={onHandleCheckAvailabiltiy} type='button'>
               Check Availability
            </button>
         </div>
         <div className={styles.o}>
            <span
               style={
                  error
                     ? { color: "red", fontWeight: "bolder" }
                     : { color: "green", fontWeight: "bolder" }
               }
            >
               {error ? error.message : data ? "User is Availability" : null}
            </span>
         </div>
      </div>
   );
}
