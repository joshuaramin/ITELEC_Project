import React from "react";

export default function Name({ styles }) {
   return (
      <div className={styles.mainContainer}>
         <h2>Enter your Fullname</h2>
         <div className={styles.number}>
            <input type='text' placeholder='e.g. John Doe' />
         </div>
      </div>
   );
}
