import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

export default function ProfessorLayout() {
   return (
      <div className={styles.container}>
         <Sidebar />
         <Outlet />
      </div>
   );
}
