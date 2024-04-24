import React, { useState } from "react";
import { CreateChapterLesson } from "../../../../../../util/Mutation/chapter";
import { useMutation } from "@apollo/client";
import styles from "./addChapter.module.scss";
import RichTextEditor from "../richtextedit";
import FormHeader from "../../../../../../components/form/formHeader";
import ButtonForm from "../../../../../../components/form/button";
import InputForm from "../../../../../../components/form/input";

export default function AddChapter({ id, close }) {
  const [title, setTitle] = useState("");

  const onHandleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const [description, setDescription] = useState("");

  const [NewChapter] = useMutation(CreateChapterLesson);

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    NewChapter({
      variables: {
        chapter: title,
        content: description,
        lessonId: id,
      },
      onCompleted: () => {
        setTitle("");
        setDescription("");
      },
      errorPolicy: "all",
    });
  };

  return (
    <div className={styles.container}>
      <FormHeader close={close} />
      <form onSubmit={onHandleSubmitForm}>
        <InputForm
          value={title}
          type={"text"}
          placeHolder={"Chapter Title"}
          onChange={onHandleTitleChange}
        />
        <div className={styles.textareaContainer}>
          <RichTextEditor
            data={description}
            setData={setDescription}
            editorblock="editorjs"
          />
        </div>

        <ButtonForm name={"Submit"} />
      </form>
    </div>
  );
}
