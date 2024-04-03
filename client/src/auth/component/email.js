import React from "react";

export default function Email({ styles }) {
   return (
      <div className={styles.mainContainer}>
         <h2>Enter your Email Address</h2>
         <div className={styles.number}>
            <input
               maxLength={10}
               type='email'
               placeholder='example@gmail.com'
            />
         </div>
      </div>
   );
}
