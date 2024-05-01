import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetChapterById } from "../../util/Query/chapter";
import parse from "html-react-parser";
import styles from "./chapterid.module.scss";
import Sidebar from "./components/siderbar";
import { TbMenu2 } from "react-icons/tb";

export default function ChapterID() {
  const params = useParams();

  const { data, loading, error } = useQuery(GetChapterById, {
    variables: {
      chapterId: params.chapterID,
    },
  });

  const [toggle, setToggle] = useState(true);

  const onHandleSidebarToggle = () => {
    setToggle(() => !toggle);
  };

  return (
    <div className={styles.container}>
      {toggle ? (
        <Sidebar courseID={params.id} close={onHandleSidebarToggle} />
      ) : null}
      <div className={styles.information}>
        <div className={styles.titleContainer}>
          {toggle ? null : (
            <button onClick={onHandleSidebarToggle}>
              <TbMenu2 size={23} />
            </button>
          )}
          <h2>{data?.getLessonChapter.chapter}</h2>
        </div>
        <div>
          {parse(`${data?.getLessonChapter.content}`, {
            htmlparser2: true,
          })}
        </div>
      </div>
    </div>
  );
}
