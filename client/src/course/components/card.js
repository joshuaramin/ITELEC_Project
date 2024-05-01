import React, { useState } from "react";
import styles from "./card.module.scss";
import { TbChevronDown, TbChevronUp, TbLock, TbNotes } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../../auth/token";
import CourseChecker from "../courseChecker";

export default function Card({ lesson, subjectID, lessonID, chapter, id }) {
  const router = useNavigate();

  const token = DecodedToken();

  const [open, close] = useState(false);

  const courseTracker = CourseChecker(id, token);

  return (
    <div className={styles.container}>
      <div className={styles.course} key={lessonID}>
        <div className={styles.courseHeader}>
          <h2>{lesson}</h2>
          <button onClick={() => close(() => !open)}>
            {open ? <TbChevronUp size={23} /> : <TbChevronDown size={23} />}
          </button>
        </div>
        {open ? (
          <div className={styles.topicContainer}>
            {chapter.map(({ chapterID, chapter }) => (
              <div key={chapterID} className={styles.topic}>
                <div className={styles.info}>
                  <TbNotes size={23} />
                  {courseTracker ? (
                    <h2
                      onClick={() =>
                        router(`/course/${subjectID}/chapter/${chapterID}`)
                      }
                    >
                      {chapter}
                    </h2>
                  ) : (
                    <h2>{chapter}</h2>
                  )}
                </div>
                {courseTracker ? null : <TbLock size={23} />}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
