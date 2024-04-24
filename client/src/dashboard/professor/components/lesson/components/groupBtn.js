import React from "react";
import { TbCirclePlus, TbEdit, TbTrash } from "react-icons/tb";

export default function GroupBtn({ styles, add, edit, onDelete }) {
  return (
    <div className={styles.btnGrp}>
      <button className={styles.addBtn} onClick={add}>
        <TbCirclePlus size={23} />
      </button>
      <button onClick={edit} className={styles.editBtn}>
        <TbEdit size={23} />
      </button>
      <button onClick={onDelete} className={styles.trashBtn}>
        <TbTrash size={23} />
      </button>
    </div>
  );
}
