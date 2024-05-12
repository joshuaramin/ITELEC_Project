import React from "react";
import styles from "./page.module.scss";
import WhyWorks from "./components/whyworks";
import Testimonial from "./components/testimonial";
import Instructor from "./components/instructor";
import Course from "./components/course";
import Main from "./components/main";

export default function Home() {
  return (
    <div className={styles.container}>
      <Main styles={styles} />
      <Instructor styles={styles} />
      <Course styles={styles} />
      <WhyWorks />
      <Testimonial />
    </div>
  );
}
