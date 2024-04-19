import React, { useState } from "react";
import { CreateChapterLesson } from "../../../../../util/Mutation/chapter";
import { useMutation } from "@apollo/client";
import styles from "./addChapter.module.scss";
import { TbX } from "react-icons/tb";
import RichTextEditor from "./richtextedit";
import parser from "html-react-parser";
import editorjsparser from "editorjs-html";
const edjsHTML = require("editorjs-html");

export default function AddChapter({ id, close }) {
   const [title, setTitle] = useState("");

   const INITIAL_DATA = {
      time: new Date().getTime(),
      blocks: [],
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
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button onClick={close}>
               <TbX size={23} />
            </button>
         </div>
         <form onSubmit={onHandleSubmitForm}>
            <input
               type='text'
               value={title}
               placeholder='Chapter Title'
               onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.textareaContainer}>
               <RichTextEditor
                  data={description}
                  setData={setDescription}
                  editorblock='editorjs'
               />
            </div>

            <button className={styles.submitform} type='submit'>
               Submit
            </button>
         </form>
      </div>
   );
}
