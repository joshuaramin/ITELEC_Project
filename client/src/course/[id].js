import React from "react";
import { GetSubjectByID } from "../util/Query/subject";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styles from "./id.module.scss";

import Card from "./components/card";
import View from "./components/view";

export default function CourseID() {
   const params = useParams();

   const { data, loading, error } = useQuery(GetSubjectByID, {
      variables: {
         subjectId: params.id,
      },
   });

   if (!data) return <p></p>;
   return (
      <div className={styles.container}>
         <div className={styles.main}>
            <div className={styles.header}>
               <h2>{data?.getSubjectById.subject}</h2>
               <p>{data?.getSubjectById.description}</p>
            </div>
            {/* <View
               title={data?.getSubjectById.subject}
               language={data?.getSubjectById.language}
               count={data?.getSubjectById.lessonCount}
            /> */}
         </div>
         <div className={styles.content}>
            {/* <div className={styles.description}>
               <h2>Course Description</h2>
            </div> */}
            <div className={styles.lesson}>
               <h2>Course Content</h2>
               <div className={styles.courseContainer}>
                  {data?.getSubjectById.lessons.map(
                     ({ lessonID, lesson, chapter }) => (
                        <Card
                           subjectID={data?.getSubjectById.subjectID}
                           key={lessonID}
                           chapter={chapter}
                           lesson={lesson}
                           lessonID={lessonID}
                        />
                     )
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
