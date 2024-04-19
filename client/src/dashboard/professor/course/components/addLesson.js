import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateSubjectLesson } from "../../../../util/Mutation/lesson";
import { TbX } from "react-icons/tb";
import styles from "./addlesson.module.scss";
import { useParams } from "react-router-dom";

export default function Addlesson({ close }) {
   const router = useParams();

   const [lesson, setLesson] = useState("");

   const [AddLesson] = useMutation(CreateSubjectLesson);

   const onHandleLessonForm = (e) => {
      e.preventDefault();
      AddLesson({
         variables: {
            lesson,
            subjectId: router.id,
         },
         onCompleted: () => {
            setLesson("");
         },
      });
   };
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button onClick={close}>
               <TbX size={23} />
            </button>
         </div>

         <form onSubmit={onHandleLessonForm}>
            <h2>Add Lesson</h2>
            <input
               type='text'
               placeholder='e.g. The Basic'
               value={lesson}
               onChange={(e) => setLesson(e.target.value)}
            />
            <button type='submit'>Submit</button>
         </form>
      </div>
   );
}
