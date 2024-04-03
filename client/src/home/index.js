import React from "react";
import styles from "./page.module.scss";
import WhyWorks from "./components/whyworks";

export default function Home() {
   return (
      <div className={styles.container}>
         <div className={styles.quote}>
            <h2>
               Free Online Academy Offers Unlimited Learning Without Fees or
               Commitment
            </h2>
         </div>
         <WhyWorks />
      </div>
   );
}
