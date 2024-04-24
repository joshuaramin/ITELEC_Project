import React, { useState } from "react";
import styles from "./editChapter.module.scss";
import FormHeader from "../../../../../../components/form/formHeader";
import InputForm from "../../../../../../components/form/input";
import ButtonForm from "../../../../../../components/form/button";
import RichTextEditor from "../richtextedit";

export default function EditChaper({ close, chapter, id, content }) {
  const [title, setTitle] = useState(chapter);
  const [description, setDescripton] = useState("");

  const onHandleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.container}>
      <FormHeader close={close} />
      <form>
        <InputForm
          value={title}
          onChange={onHandleTitleChange}
          placeHolder={""}
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
