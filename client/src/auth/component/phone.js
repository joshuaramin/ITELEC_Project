import React from "react";

export default function Phone({ styles }) {
   return (
      <div className={styles.mainContainer}>
         <h2>Enter your Phone Number</h2>
         <div className={styles.number}>
            <div className={styles.countryCode}>
               <span>+63</span>
            </div>
            <input maxLength={10} type='text' placeholder='9499144792' />
         </div>
      </div>
   );
}
