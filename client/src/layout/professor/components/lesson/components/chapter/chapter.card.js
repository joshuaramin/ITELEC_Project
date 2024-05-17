import React, { useState } from "react";
import styles from "./chapter.module.scss";
import { TbNotes, TbEdit, TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DeleteChapterLesson } from "../../../../../../util/Mutation/chapter";
import DeleteComponent from "../../../deleteComponent";
import EditChaper from "./editChapter";
import { useMutation } from "@apollo/client";

export default function ChapterCard({
  chapterID,
  chapter,
  content,
  courseID,
  id,
}) {
  const router = useNavigate();

  const [onEditChapter, onSetEditChapter] = useState(false);
  const [onDeleteChapter, onSetDeleteChapter] = useState(false);
  const [mutate] = useMutation(DeleteChapterLesson);

  const onHandleEditChapter = () => {
    onSetEditChapter(() => !onEditChapter);
  };

  const onHandleDeleteChapter = () => {
    onSetDeleteChapter(() => !onDeleteChapter);
  };

  const onHandleSubmitForm = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        chapterId: chapterID,
      },
      errorPolicy: "all",
      onCompleted: () => {
        window.location.reload();
      },
    });
  };
  return (
    <div className={styles.chapterCard} key={chapterID}>
      {onDeleteChapter ? (
        <div className={styles.lessonHover}>
          <DeleteComponent
            close={onHandleDeleteChapter}
            onHandleSubmitForm={onHandleSubmitForm}
          />
        </div>
      ) : null}
      {onEditChapter ? (
        <div className={styles.lessonHover}>
          <EditChaper
            close={onHandleEditChapter}
            id={chapterID}
            chapter={chapter}
            content={content}
          />
        </div>
      ) : null}
      <div className={styles.info}>
        <TbNotes size={23} />
        <span>{chapter}</span>
      </div>
      <div className={styles.btnGrp}>
        <button className={styles.editBtn} onClick={onHandleEditChapter}>
          <TbEdit size={23} />
        </button>
        <button className={styles.trashBtn} onClick={onHandleDeleteChapter}>
          <TbTrash size={23} />
        </button>
      </div>
    </div>
  );
}
