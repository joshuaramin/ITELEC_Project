import React, { useEffect, useState } from "react";
import styles from "./lesson.module.scss";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import AddChapter from "./components/chapter/addChapter";
import { GetAllChapterBylessonID } from "../../../../util/Query/chapter";
import { NewlyChapterLesson } from "../../../../util/subscription/index";
import { DeleteSubjectLesson } from "../../../../util/Mutation/lesson";
import { useMutation, useQuery } from "@apollo/client";
import EditLesson from "./components/editLesson";
import DeleteComponent from "../deleteComponent";
import GroupBtn from "./components/groupBtn";
import ChapterCard from "./components/chapter/chapter.card";

export default function LessonCard({ id, courseID, lesson }) {
  const [onToggle, setOnToggle] = useState(false);
  const [addChapter, setAddChapter] = useState(false);
  const [editLesson, setEditLesson] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(false);

  const [mutate] = useMutation(DeleteSubjectLesson);
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
    mutate({
      variables: {
        lessonId: id,
      },
      onCompleted: () => {
        window.location.reload();
      },
      errorPolicy: "all",
    });
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
          <h3>{lesson}</h3>
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
          {data?.getAllChapterByLessonID.map(
            ({ chapterID, chapter, content }) => (
              <ChapterCard
                key={chapterID}
                chapterID={chapterID}
                chapter={chapter}
                content={content}
                courseID={courseID}
                id={id}
              />
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
