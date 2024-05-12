import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Cookies from "js-cookie";
import Search from "./search/search";
import Profile from "./profile/profile";
import { TbMenu2, TbSearch, TbUser } from "react-icons/tb";
import User from "./mobile/user";

export default function Header() {
  const token = Cookies.get("access_token");

  const [toggleUser, setToggleUser] = useState(false);

  const onHandleToggleUser = () => {
    setToggleUser(() => !toggleUser);
  };

  return (
    <div className={styles.container}>
      <div className={styles.web}>
        <img src="/schoolacademylogo.png" alt="" height={130} width={120} />
        <Search />
        {token ? (
          <Profile token={token} />
        ) : (
          <div className={styles.auth}>
            <a href="/auth/login">
              <span>Login</span>
            </a>
            <a href="/auth/register">
              <span>Sign In</span>
            </a>
          </div>
        )}
      </div>
      <div className={styles.mobile}>
        <h2>School Academy</h2>
        <button className={styles.navbtn} onClick={onHandleToggleUser}>
          <TbMenu2 size={25} />
        </button>
        {toggleUser ? <User close={onHandleToggleUser} /> : null}
      </div>
    </div>
  );
}
