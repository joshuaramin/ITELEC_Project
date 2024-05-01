import React, { useState } from "react";
import styles from "./description.module.scss";
import EditDescription from "../edit/editDescription";

import { TbEdit } from "react-icons/tb";

export default function Description({ description }) {
  const [onHandleToggleDescription, setOnHandleDescription] = useState(false);

  const onHandleDescription = () => {
    setOnHandleDescription(() => !onHandleToggleDescription);
  };

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.descriptionHeader}>
        <h2>Description</h2>
        <button onClick={onHandleDescription}>
          <TbEdit size={23} />
        </button>
      </div>
      <div className={styles.body}>
        {onHandleToggleDescription ? (
          <EditDescription description={description} />
        ) : (
          <span>{description}</span>
        )}
      </div>
    </div>
  );
}
