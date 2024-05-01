import React, { useState } from "react";
import styles from "./view.module.scss";
import { TbBook, TbLanguage, TbShare, TbUsers } from "react-icons/tb";
import { CreateSubjectEnroll } from "../../util/Mutation/enroll";
import { GetSubjectByID } from "../../util/Query/subject";
import { useMutation } from "@apollo/client";
import { DecodedToken } from "../../auth/token";
import CourseChecker from "../courseChecker";
import Message from "../../components/message/message";

export default function View({ image, count, language, id, title }) {
  const token = DecodedToken();

  const [message, setMessage] = useState(false);

  const onHandleMessageSetNull = () => {
    setMessage(() => !message);
  };
  const [mutate, { data, error }] = useMutation(CreateSubjectEnroll, {
    variables: {
      userId: token,
      subjectId: id,
    },
    onCompleted: () => {
      setMessage(true);
    },
    refetchQueries: [
      {
        query: GetSubjectByID,
        variables: {
          subjectId: id,
        },
      },
    ],
    errorPolicy: "all",
  });

  const onHandleErolledForm = (e) => {
    e.preventDefault();
    mutate();
  };
  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.errorMessage}>
          <Message message={error.message} error={error} />
        </div>
      ) : null}
      {message ? (
        <div className={styles.congratulationMessage}>
          <Message
            message={`Congratulations on being enrolled ${title}! in Your dedication to learning and passion for ${title} will surely lead to an enriching academic journey ahead.`}
            data={data}
            close={onHandleMessageSetNull}
          />
        </div>
      ) : null}
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
          <span>{count} Lesson</span>
        </div>
        <div>
          <TbLanguage size={20} />
          <span>Language: {language}</span>
        </div>
      </div>
      {CourseChecker(id, token) === false ? (
        <div className={styles.kfoa}>
          <div className={styles.enrolled}>
            <button onClick={onHandleErolledForm}>
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
      ) : (
        <div className={styles.kfoa}>
          <div className={styles.enrolled}>
            <button>
              <span>Enrolled</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
