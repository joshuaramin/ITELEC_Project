import React, { useState } from "react";
import styles from "./title.module.scss";
import EditSubjectTitle from "../edit/editSubject";
import { TbEdit } from "react-icons/tb";

export default function Title({ title }) {
  const [toggleTitle, setToggleTitle] = useState(false);
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>
        {toggleTitle ? <EditSubjectTitle title={title} /> : <h2>{title}</h2>}
      </div>
      <div>
        <button
          className={styles.editBtn}
          onClick={() => setToggleTitle(() => !toggleTitle)}
        >
          <TbEdit size={25} />
        </button>
      </div>
    </div>
  );
}
