import React from "react";
import styles from "./deleteComponent.module.scss";
import FormHeader from "../../../components/form/formHeader";
import ButtonForm from "../../../components/form/button";

export default function DeleteComponent({ close, onHandleSubmitForm }) {
  return (
    <div className={styles.container}>
      <form onSubmit={onHandleSubmitForm}>
        <h2>Are you sure do you want to delete?</h2>
        <div className={styles.btnGrpContainer}>
          <button className={styles.cancelBtn} onClick={close} type="button">
            Cancel
          </button>
          <ButtonForm name={"Submit"} />
        </div>
      </form>
    </div>
  );
}
