import React from "react";
import { TbMenu2, TbUser } from "react-icons/tb";
import styles from "./mobile.module.scss";

export default function Mobile({ token }) {
   return (
      <div className={styles.container}>
         <button>
            <TbMenu2 size={26} />
         </button>
         <h2>School Academy</h2>
         <button>
            <TbUser size={26} />
         </button>
      </div>
   );
}
