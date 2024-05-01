import React, { useState } from "react";
import InputForm from "../../../../../components/form/input";
import ButtonForm from "../../../../../components/form/button";
import styles from "./editSubject.module.scss";
import { useMutation } from "@apollo/client";
import { UpdateSubjectTitle } from "../../../../../util/Mutation/course";
import { useParams } from "react-router-dom";

export default function EditSubjectTitle({ title }) {
  const [onTitleChange, setOnTitleChange] = useState(title);
  const params = useParams();

  const [mutate] = useMutation(UpdateSubjectTitle);

  const onHandleUpdateTitleChange = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        subjectId: params.id,
        subject: onTitleChange,
      },
      errorPolicy: "all",
      onCompleted: () => {
        window.location.reload();
      },
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onHandleUpdateTitleChange}>
        <InputForm
          type={"text"}
          placeHolder={onTitleChange}
          value={onTitleChange}
          onChange={(e) => setOnTitleChange(e.target.value)}
        />
        <ButtonForm name={"Submit"} />
      </form>
    </div>
  );
}
