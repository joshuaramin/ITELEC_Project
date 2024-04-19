import React, { useState } from "react";
import styles from "./lesson.module.scss";
import {
   TbEdit,
   TbChevronDown,
   TbChevronUp,
   TbCirclePlus,
   TbNotes,
   TbTrash,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import AddChapter from "./components/addChapter";
import { GetAllChapterBylessonID } from "../../../../util/Query/chapter";
import { useQuery } from "@apollo/client";

export default function LessonCard({ id, courseID, lesson }) {
   const router = useNavigate();

   const [onToggle, setOnToggle] = useState(false);
   const [addChapter, setAddChapter] = useState(false);

   const { data, loading, error, subscribeToMore } = useQuery(
      GetAllChapterBylessonID,
      {
         variables: {
            lessonId: id,
         },
      }
   );

   const onHandleAddChapterToggle = () => {
      setAddChapter(() => !addChapter);
   };

   return (
      <div className={styles.container}>
         {addChapter ? (
            <div className={styles.addChapter}>
               <AddChapter id={id} close={onHandleAddChapterToggle} />
            </div>
         ) : null}
         <div className={styles.lessonContainer}>
            <div className={styles.toggle}>
               <button onClick={() => setOnToggle(() => !onToggle)}>
                  {onToggle ? (
                     <TbChevronUp size={23} />
                  ) : (
                     <TbChevronDown size={23} />
                  )}
               </button>
               <h3
                  onClick={() =>
                     router(
                        `/dashboard/professor/course/${courseID}/lesson/${id}/`
                     )
                  }
               >
                  {lesson}
               </h3>
            </div>
            <div className={styles.btnGrp}>
               <button
                  className={styles.addBtn}
                  onClick={onHandleAddChapterToggle}
               >
                  <TbCirclePlus size={20} />
               </button>
               <button className={styles.editBtn}>
                  <TbEdit size={23} />
               </button>
               <button className={styles.trashBtn}>
                  <TbTrash size={23} />
               </button>
            </div>
         </div>
         {onToggle ? (
            <div className={styles.chapter}>
               {data?.getAllChapterByLessonID.map(({ chapterID, chapter }) => (
                  <div className={styles.chapterCard} key={chapterID}>
                     <div className={styles.info}>
                        <TbNotes size={23} />
                        <span
                           onClick={() =>
                              router(
                                 `/dashboard/professor/course/${courseID}/lesson/${id}/content/${chapterID}`
                              )
                           }
                        >
                           {chapter}
                        </span>
                     </div>
                     <div className={styles.btnGrp}>
                        <button>
                           <TbTrash size={23} />
                        </button>
                        <button>
                           <TbEdit size={23} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         ) : null}
      </div>
   );
}
