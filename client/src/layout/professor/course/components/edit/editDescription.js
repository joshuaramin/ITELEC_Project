import React, { useState } from "react";
import TextareaForm from "../../../../../components/form/textarea";
import ButtonForm from "../../../../../components/form/button";
import styles from "./editDescription.module.scss";
import { useMutation } from "@apollo/client";
import { UpdateDescription } from "../../../../../util/Mutation/course";
import { useParams } from "react-router-dom";
export default function EditDescription({ description }) {
  const params = useParams();

  const [onHandleDescription, setOnHandleDescription] = useState(description);

  const onHandleChange = (e) => {
    setOnHandleDescription(e.target.value);
  };

  const [mutate] = useMutation(UpdateDescription);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        subjectId: params.id,
        description: onHandleDescription,
      },
      onCompleted: () => {
        window.location.reload();
      },
      errorPolicy: "all",
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onHandleSubmit}>
        <TextareaForm value={onHandleDescription} onChange={onHandleChange} />
        <ButtonForm name={"Submit"} />
      </form>
    </div>
  );
}
