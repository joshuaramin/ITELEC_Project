import styles from "./sidebar.module.scss";
import { TbDashboard, TbBook, TbSettings, TbLogout2 } from "react-icons/tb";
import React from "react";
import {
   useNavigate,
   useParams,
   matchPath,
   useLocation,
   matchRoutes,
} from "react-router-dom";
import Cookies from "js-cookie";

const ProfessorURL = [
   {
      name: "Dashboard",
      url: "/dashboard/professor/overview",
      shortcut: "/professor",
      icon: <TbDashboard size={23} />,
   },
   {
      name: "Course",
      url: "/dashboard/professor/course",
      shortcut: "/professor",
      icon: <TbBook size={23} />,
   },
   {
      name: "Settings",
      url: "/dashboard/professor/settings",
      shortcut: "/professor",
      icon: <TbSettings size={23} />,
   },
];

export default function Sidebar() {
   const router = useNavigate();
   const location = useLocation();
   const params = useParams();

   const onHandleLogout = () => {
      Cookies.remove("access_token");
      router("/");
      window.location.reload();
   };
   return (
      <div className={styles.container}>
         <div className={styles.sidebarHeader}></div>
         <div className={styles.urlContainer}>
            {ProfessorURL.map(({ name, url, icon, shortcut }) => (
               <div className={styles.sidebarContainer} key={name}>
                  <button
                     className={
                        location.pathname.includes(url)
                           ? styles.activeBtn
                           : null
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
