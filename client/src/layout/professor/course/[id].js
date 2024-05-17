import React, { useState, useEffect } from "react";
import styles from "./id.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetSubjectByID } from "../../../util/Query/subject";
import { GetSubjectLessonBySubjectID } from "../../../util/Query/lesson";
import { NewlySubjectLesson } from "../../../util/subscription/index";
import LessonCard from "../components/lesson/lesson.card";
import Addlesson from "./components/Add/addLesson";
import Header from "./components/header/header";
import Title from "./components/title/title";
import Description from "./components/description/description";
import Lesson from "./components/lesson/lesson";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {toggleLesson ? (
        <div className={styles.toggleLessons}>
          <Addlesson close={onHandleTogglesson} />
        </div>
      ) : null}
      <Header image={data?.getSubjectById.image} />
      <div className={styles.body}>
        <Title title={data?.getSubjectById.subject} />
        <div className={styles.language}>
          <span>Language: {data?.getSubjectById.language}</span>
        </div>
        <Description description={data?.getSubjectById.description} />
        <div className={styles.lessonContainer}>
          <Lesson onHandleTogglesson={onHandleTogglesson} />

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
