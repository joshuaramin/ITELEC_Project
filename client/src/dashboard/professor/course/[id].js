import React, { useState, useEffect } from "react";
import styles from "./id.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetSubjectByID } from "../../../util/Query/subject";
import { GetSubjectLessonBySubjectID } from "../../../util/Query/lesson";
import { NewlySubjectLesson } from "../../../util/subscription/index";
import { TbEdit, TbPlus } from "react-icons/tb";
import LessonCard from "../components/lesson/lesson.card";
import Addlesson from "./components/addLesson";
export default function CourseID() {
  const params = useParams();

  const [toggleLesson, setTogglesson] = useState(false);

  const onHandleTogglesson = () => {
    setTogglesson(() => !toggleLesson);
  };

  const { data, loading, error } = useQuery(GetSubjectByID, {
    variables: {
      subjectId: params.id,
    },
  });

  const { data: LessonData, subscribeToMore } = useQuery(
    GetSubjectLessonBySubjectID,
    {
      variables: {
        subjectId: params.id,
      },
    }
  );

  useEffect(() => {
    return subscribeToMore({
      document: NewlySubjectLesson,
      variables: {
        subjectId: params.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLesson = subscriptionData.data.NewlyCreatedSubjectLesson;

        return Object.assign(
          {},
          {
            getAllSubjectLesson: [...prev.getAllSubjectLesson, newLesson],
          }
        );
      },
    });
  }, [params.id, subscribeToMore]);

  return (
    <div className={styles.container}>
      {toggleLesson ? (
        <div className={styles.toggleLessons}>
          <Addlesson close={onHandleTogglesson} />
        </div>
      ) : null}
      <div className={styles.header}>
        <div className={styles.bgCourseImage}>
          <img
            src={data?.getSubjectById.image}
            alt=""
            style={{
              width: "100%",
              objectFit: "cover",
              imageResolution: "inherit",
            }}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.titleContainer}>
          <div>
            <h2>{data?.getSubjectById.subject}</h2>
          </div>
          <div>
            <button>
              <TbEdit size={25} />
            </button>
          </div>
        </div>
        <div className={styles.language}>
          <span>Language: {data?.getSubjectById.language}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <div>
            <h2>Description</h2>
            <button>
              <TbEdit size={23} />
            </button>
          </div>
          <span>{data?.getSubjectById.description}</span>
        </div>
        <div className={styles.lessonContainer}>
          <div className={styles.lesson}>
            <h2>Lessons</h2>
            <button onClick={onHandleTogglesson}>
              <TbPlus size={20} />
              <span>Add Lesson</span>
            </button>
          </div>

          {LessonData?.getAllSubjectLesson.map(
            ({ lessonID, lesson, chapter }) => (
              <LessonCard
                key={lessonID}
                id={lessonID}
                courseID={data?.getSubjectById.subjectID}
                lesson={lesson}
                chapter={chapter}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
