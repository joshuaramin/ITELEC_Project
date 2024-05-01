import React, { useState } from "react";
import ChapterCard from "./chapter/chapter";

import styles from "./lessoncard.module.scss";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { useQuery } from "@apollo/client";
import { GetAllChapterBylessonID } from "../../../../util/Query/chapter";

export default function LessonCard({ lesson, lessonID, courseID }) {
  const [toggle, setToggle] = useState(false);

  const { data, loading, error } = useQuery(GetAllChapterBylessonID, {
    variables: {
      lessonId: lessonID,
    },
  });

  const onHandleToggle = () => {
    setToggle(() => !toggle);
  };
  return (
    <div className={styles.container} key={lessonID}>
      <div className={styles.lessonContainer}>
        <div className={styles.dropdown}>
          <button onClick={onHandleToggle}>
            {toggle ? <TbChevronUp size={23} /> : <TbChevronDown size={23} />}
          </button>
        </div>
        <div className={styles.title}>
          <h2>{lesson}</h2>
        </div>
      </div>
      {toggle ? (
        <div className={styles.chapterContainer}>
          {data.getAllChapterByLessonID.map(({ chapter, chapterID }) => (
            <ChapterCard
              key={chapterID}
              chapter={chapter}
              chapterID={chapterID}
              courseID={courseID}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
