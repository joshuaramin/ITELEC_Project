import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Cookies from "js-cookie";
import Search from "./search/search";
import Profile from "./profile/profile";
import { TbSearch, TbUser } from "react-icons/tb";
import InputForm from "../../components/form/input";

export default function Header() {
  const token = Cookies.get("access_token");

  return (
    <div className={styles.container}>
      <div className={styles.web}>
        <h2>School Academy</h2>
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
        <button>
          <TbSearch size={25} />
        </button>
        <h2>School Academy</h2>
        <button>
          <TbUser size={25} />
        </button>
      </div>
    </div>
  );
}
