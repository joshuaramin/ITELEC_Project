import React from "react";
import styles from "./header.module.scss";
import Search from "./search/search";
import Cookies from "js-cookie";
import Profile from "./profile/profile";

export default function Header() {
   const token = Cookies.get("access_token");

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
