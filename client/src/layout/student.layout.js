import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import Sidebar from "../components/sidebar/sidebar";
import { TbBook, TbSettings } from "react-icons/tb";

const studentURl = [
  {
    name: "Course",
    url: "/dashboard/student/course",
    icon: <TbBook size={23} />,
  },
  {
    name: "Settings",
    url: "/dashboard/student/settings",
    icon: <TbSettings size={23} />,
  },
];

export default function StudentLayout() {
  return (
    <div className={styles.container}>
      <Sidebar urlLink={studentURl} />
      <Outlet />
    </div>
  );
}
