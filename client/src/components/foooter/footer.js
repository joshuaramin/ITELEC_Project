import React, { useState } from "react";
import styles from "./footer.module.scss";
export default function Footer() {
   const [date, setDate] = useState(new Date().getFullYear());
   return (
      <div className={styles.container}>
         <div className={styles.links}></div>
         <div className={styles.footer}>
            <span> &copy; {date} School Academy. All Rights Reserved</span>
         </div>
      </div>
   );
}
