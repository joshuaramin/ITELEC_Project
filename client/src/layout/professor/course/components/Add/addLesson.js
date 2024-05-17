import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateSubjectLesson } from "../../../../../util/Mutation/lesson";
import styles from "./addlesson.module.scss";
import { useParams } from "react-router-dom";
import InputForm from "../../../../../components/form/input";
import ButtonForm from "../../../../../components/form/button";
import FormHeader from "../../../../../components/form/formHeader";
import Message from "../../../../../components/message/message";

export default function Addlesson({ close }) {
  const router = useParams();

  const [lesson, setLesson] = useState("");

  const [AddLesson, { error }] = useMutation(CreateSubjectLesson);

  const onHandleChange = (e) => {
    setLesson(e.target.value);
  };

  const onHandleLessonForm = (e) => {
    e.preventDefault();
    AddLesson({
      variables: {
        lesson,
        subjectId: router.id,
      },
      onError: () => {},
      errorPolicy: "all",
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
        {error ? <Message error={error} message={error.message} /> : null}
        <InputForm
          type={"text"}
          value={lesson}
          placeHolder={"e.g. The Basic"}
          onChange={onHandleChange}
        />
        <ButtonForm name={"Submit"} />
      </form>
    </div>
  );
}
