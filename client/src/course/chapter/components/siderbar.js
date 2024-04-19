import React from "react";
import styles from "./sidebar.module.scss";
import { GetSubjectLessonBySubjectID } from "../../../util/Query/lesson";
import { useQuery } from "@apollo/client";
import { TbChevronDown, TbChevronUp, TbMenu2 } from "react-icons/tb";
import LessonCard from "./lesson/lesson";

export default function Sidebar({ courseID, close }) {
   const { data: LessonData } = useQuery(GetSubjectLessonBySubjectID, {
      variables: {
         subjectId: courseID,
      },
   });

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button onClick={close}>
               <TbMenu2 size={25} />
            </button>
         </div>
         {LessonData?.getAllSubjectLesson.map(({ lessonID, lesson }) => (
            <LessonCard key={lessonID} lesson={lesson} lessonID={lessonID} />
         ))}
      </div>
   );
}
