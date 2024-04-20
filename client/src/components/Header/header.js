import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Cookies from "js-cookie";
import Web from "./web/web";
import Mobile from "./mobile/mobile";

export default function Header() {
   const token = Cookies.get("access_token");

   const [width, setWidth] = useState(null);

   useEffect(() => {
      const getWindowWidth = () => {
         setWidth(window.innerWidth);
      };

      window.addEventListener("resize", getWindowWidth);

      return () => window.removeEventListener("resize", getWindowWidth);
   });

   return (
      <div className={styles.container}>
         {width < 900 ? <Mobile token={token} /> : <Web token={token} />}
      </div>
   );
}
