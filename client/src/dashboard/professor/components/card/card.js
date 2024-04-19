import React from "react";
import styles from "./card.module.scss";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import DeleteCard from "./deleteCard";
import Image from "./image";
export default function Card({
   id,
   name,
   image,
   language,
   description,
   lessons,
}) {
   const router = useNavigate();

   return (
      <div className={styles.container}>
         <DeleteCard styles={styles} id={id} />
         <Image styles={styles} image={image} />
         <div className={styles.info}>
            <h2 onClick={() => router(`/dashboard/professor/course/${id}`)}>
               {name}
            </h2>
         </div>
         <div className={styles.body}>
            <span>Language: {language}</span>
            <span>Topics</span>
            <div className={styles.topicContainer}>
               {lessons.slice(0, 7).map(({ lesson, lessonID }) => (
                  <div key={lessonID}>
                     <li
                        onClick={() =>
                           router(
                              `/dashboard/professor/course/${id}/lesson/${lessonID}`
                           )
                        }
                     >
                        {lesson}
                     </li>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
