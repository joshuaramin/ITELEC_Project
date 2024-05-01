import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Sidebar from "../components/sidebar/sidebar";
import { TbBook, TbSettings } from "react-icons/tb";

const ProfessorURL = [
  {
    name: "Course",
    url: "/dashboard/professor/course",
    icon: <TbBook size={23} />,
  },
  {
    name: "Settings",
    url: "/dashboard/professor/settings",
    icon: <TbSettings size={23} />,
  },
];

export default function ProfessorLayout() {
  return (
    <div className={styles.container}>
      <Sidebar urlLink={ProfessorURL} />
      <Outlet />
    </div>
  );
}
