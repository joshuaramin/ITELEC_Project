import React from "react";
import styles from "./header.module.scss";
import Search from "./search/search";
import { Link } from "react-router-dom";
export default function Header() {
   return (
      <div className={styles.container}>
         <div>
            <h2>School Academy</h2>
         </div>
         <Search />
         <div className={styles.auth}>
            <a href='/auth/login'>
               <span>Login</span>
            </a>
            <a href='/auth/login'>
               <span>Sign In</span>
            </a>
         </div>
      </div>
   );
}
