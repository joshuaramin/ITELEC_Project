import React, { useEffect, useState } from "react";
import styles from "./lesson.module.scss";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import AddChapter from "./components/chapter/addChapter";
import { GetAllChapterBylessonID } from "../../../../util/Query/chapter";
import { NewlyChapterLesson } from "../../../../util/subscription/index";

import { useQuery } from "@apollo/client";
import EditLesson from "./components/editLesson";
import DeleteComponent from "../deleteComponent";
import GroupBtn from "./components/groupBtn";
import ChapterCard from "./components/chapter/chapter.card";

export default function LessonCard({ id, courseID, lesson }) {
  const router = useNavigate();

  const [onToggle, setOnToggle] = useState(false);
  const [addChapter, setAddChapter] = useState(false);
  const [editLesson, setEditLesson] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(false);

  const { data, loading, error, subscribeToMore } = useQuery(
    GetAllChapterBylessonID,
    {
      variables: {
        lessonId: id,
      },
    }
  );

  useEffect(() => {
    return subscribeToMore({
      document: NewlyChapterLesson,
      variables: {
        lessonId: id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newLesson = subscriptionData.data.NewlyLessonChapterSubscription;

        return Object.assign(
          {},
          {
            getAllChapterByLessonID: [
              ...prev.getAllChapterByLessonID,
              newLesson,
            ],
          }
        );
      },
    });
  });

  const onHandleEditLesson = () => {
    setEditLesson(() => !editLesson);
  };

  const onHandleAddChapterToggle = () => {
    setAddChapter(() => !addChapter);
  };

  const onHandleDeleteLesson = () => {
    setDeleteLesson(() => !deleteLesson);
  };

  const onHandleToggle = () => {
    setOnToggle(() => !onToggle);
  };

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className={styles.container}>
      {addChapter ? (
        <div className={styles.lessonHover}>
          <AddChapter id={id} close={onHandleAddChapterToggle} />
        </div>
      ) : null}
      {editLesson ? (
        <div className={styles.lessonHover}>
          <EditLesson id={id} close={onHandleEditLesson} lesson={lesson} />
        </div>
      ) : null}

      {deleteLesson ? (
        <div className={styles.lessonHover}>
          <DeleteComponent
            id={id}
            close={onHandleDeleteLesson}
            onHandleSubmitForm={onHandleSubmitForm}
          />
        </div>
      ) : null}
      <div className={styles.lessonContainer}>
        <div className={styles.toggle}>
          <button onClick={onHandleToggle}>
            {onToggle ? <TbChevronUp size={23} /> : <TbChevronDown size={23} />}
          </button>
          <h3
            onClick={() =>
              router(`/dashboard/professor/course/${courseID}/lesson/${id}/`)
            }
          >
            {lesson}
          </h3>
        </div>
        <GroupBtn
          styles={styles}
          add={onHandleAddChapterToggle}
          edit={onHandleEditLesson}
          onDelete={onHandleDeleteLesson}
        />
      </div>
      {onToggle ? (
        <div className={styles.chapter}>
          {data?.getAllChapterByLessonID.map(({ chapterID, chapter }) => (
            <ChapterCard
              key={chapterID}
              chapter={chapter}
              courseID={courseID}
              id={id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
