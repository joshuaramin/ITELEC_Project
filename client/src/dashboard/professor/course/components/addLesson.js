import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateSubjectLesson } from "../../../../util/Mutation/lesson";
import { TbX } from "react-icons/tb";
import styles from "./addlesson.module.scss";
import { useParams } from "react-router-dom";
import InputForm from '../../../../components/form/input'
import ButtonForm from '../../../../components/form/button'
import FormHeader from '../../../../components/form/formHeader'

export default function Addlesson({ close }) {
   const router = useParams();

   const [lesson, setLesson] = useState("");

   const [AddLesson] = useMutation(CreateSubjectLesson);

   const onHandleChange = (e) => {
      setLesson(e.target.value)
   }

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
       <FormHeader close={close} />
         <form onSubmit={onHandleLessonForm}>
            <h2>Add Lesson</h2>
            <InputForm type={'text'} placeHolder={'e.g. The Basic'} onChange={onHandleChange}/>
            <ButtonForm name={'Submit'}/>
         </form>
      </div>
   );
}
