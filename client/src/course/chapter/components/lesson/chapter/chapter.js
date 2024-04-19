import React from "react";
import styles from "./chapter.module.scss";
import { TbNotes } from "react-icons/tb";

export default function ChapterCard({ chapter, chapterID }) {
   return (
      <div className={styles.container}>
         <TbNotes size={23} />
         <span>{chapter}</span>
      </div>
   );
}
