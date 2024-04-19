import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@apollo/client";
import { ProfileById } from "../../../util/Query/profile";
import styles from "./profile.module.scss";
import Cookies from "js-cookie";
import { TbChevronDown } from "react-icons/tb";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile({ token }) {
   const decodedToken = jwtDecode(token);

   const router = useNavigate();
   const [open, setClose] = useState(false);

   const { data } = useQuery(ProfileById, {
      variables: {
         userId: decodedToken.userID,
      },
   });

   const toggle = [
      {
         name: "Dashboard",
         url: `/dashboard/${decodedToken.role}`,
      },
      {
         name: "Settings",
         url: "/dashboard/settings",
      },
   ];

   const onHandleLogout = () => {
      Cookies.remove("access_token");
      router("/");
      window.location.reload();
   };

   return (
      <div className={styles.container}>
         <h2>{data?.getUserProfileById.fullname}</h2>
         <button
            className={styles.profileBtn}
            onClick={() => setClose(() => !open)}
         >
            <TbChevronDown size={20} />
         </button>
         {open ? (
            <div className={styles.toggleContainer}>
               {toggle.map(({ name, url }) => (
                  <button
                     key={name}
                     onClick={() => {
                        router(url);
                        setClose(false);
                     }}
                  >
                     {name}
                  </button>
               ))}
               <button onClick={onHandleLogout}>Logout</button>
            </div>
         ) : null}
      </div>
   );
}
