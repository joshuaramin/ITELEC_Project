import React from "react";
import styles from "./chapter.module.scss";
import { TbNotes } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";

export default function ChapterCard({ chapter, chapterID, courseID }) {
  const route = useNavigate();
  const location = useLocation();

  return (
    <button
      className={
        location.pathname.includes(chapterID)
          ? styles.activate
          : styles.container
      }
      type="button"
      onClick={() => route(`/course/${courseID}/chapter/${chapterID}`)}
    >
      <TbNotes size={23} />
      <span>{chapter}</span>
    </button>
  );
}
