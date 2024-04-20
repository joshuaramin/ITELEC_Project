import React from "react";
import Search from "../search/search";
import Profile from "../profile/profile";
import styles from "../header.module.scss";

export default function Web({ token }) {
   return (
      <div className={styles.container}>
         <div>
            <h2>School Academy</h2>
         </div>
         <Search />
         {token ? (
            <Profile token={token} />
         ) : (
            <div className={styles.auth}>
               <a href='/auth/login'>
                  <span>Login</span>
               </a>
               <a href='/auth/register'>
                  <span>Sign In</span>
               </a>
            </div>
         )}
      </div>
   );
}
