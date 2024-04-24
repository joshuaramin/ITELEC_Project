import React from "react";
import styles from "./view.module.scss";
import { TbBook, TbLanguage, TbShare, TbUsers } from "react-icons/tb";
export default function View({ image }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt="" height={140} width={400} />
      </div>
      <div className={styles.information}>
        <div>
          <TbUsers size={20} />{" "}
          <span>{Intl.NumberFormat("en-US").format(1200)} Students</span>
        </div>
        <div>
          <TbBook size={20} />
          <span>8 Lesson</span>
        </div>
        <div>
          <TbLanguage size={20} />
          <span>Language: English</span>
        </div>
      </div>
      <div className={styles.kfoa}>
        <div className={styles.enrolled}>
          <button>
            <span>Enroll a Course</span>
          </button>
        </div>
        <div className={styles.optionals}>
          <button>
            <TbShare size={23} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
