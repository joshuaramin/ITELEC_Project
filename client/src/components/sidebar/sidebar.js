import styles from "./sidebar.module.scss";
import { TbLogout2 } from "react-icons/tb";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar({ urlLink }) {
  const router = useNavigate();
  const location = useLocation();

  const onHandleLogout = () => {
    Cookies.remove("access_token");
    router("/");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.sidebarHeader}></div>
      <div className={styles.urlContainer}>
        {urlLink.map(({ name, url, icon }) => (
          <div className={styles.sidebarContainer} key={name}>
            <button
              className={
                location.pathname.includes(url) ? styles.activeBtn : null
              }
              onClick={() => router(url)}
            >
              {icon}
              <span>{name}</span>
            </button>
          </div>
        ))}
      </div>
      <div className={styles.logoutContainer}>
        <button onClick={onHandleLogout}>
          <TbLogout2 size={23} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
