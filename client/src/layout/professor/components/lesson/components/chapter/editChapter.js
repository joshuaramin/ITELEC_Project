import React, { useState } from "react";
import styles from "./editChapter.module.scss";
import FormHeader from "../../../../../../components/form/formHeader";
import InputForm from "../../../../../../components/form/input";
import ButtonForm from "../../../../../../components/form/button";
import RichTextEditor from "../richtextedit";
import { useMutation } from "@apollo/client";
import { UpdateChapterLesson } from "../../../../../../util/Mutation/chapter";

export default function EditChaper({ close, chapter, id, content }) {
  const [title, setTitle] = useState(chapter);
  const [description, setDescripton] = useState(content);

  const [mutate] = useMutation(UpdateChapterLesson);

  const onHandleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        chapterId: id,
        chapter: title,
        content: description,
      },
      onCompleted: () => {
        window.location.reload();
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
          onChange={onHandleTitleChange}
          placeHolder={title}
          type={"text"}
        />
        <div className={styles.textareaContainer}>
          <RichTextEditor data={description} setData={setDescripton} />
        </div>
        <ButtonForm name={"Submit"} />
      </form>
    </div>
  );
}
