import React, { useEffect, useState } from "react";
import styles from "./course.module.scss";
import { useQuery } from "@apollo/client";
import { NewlyCreatedSubjectByUser } from "../../util/subscription/index";
import { GetMySubjectCreated } from "../../util/Query/subject";
import Card from "./components/card/card";
import { TbPlus } from "react-icons/tb";
import Search from "./components/search/search";
import AddCourse from "./components/addCourse";
import { DecodedToken } from "../../auth/token";

export default function Course() {
  const [toggle, setToggle] = useState(false);

  const token = DecodedToken();
  const { data, loading, error, subscribeToMore } = useQuery(
    GetMySubjectCreated,
    {
      variables: {
        userId: token,
      },
    }
  );

  useEffect(() => {
    return subscribeToMore({
      document: NewlyCreatedSubjectByUser,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCourse = subscriptionData.data.NewlySubjectCreatedByUser;
        return Object.assign(
          {},
          {
            getMySubjectCreated: [newCourse, ...prev.getMySubjectCreated],
          }
        );
      },
      variables: {
        userId: token,
      },
    });
  }, [subscribeToMore, token]);

  const onHandleChangeToggle = () => {
    setToggle(() => !toggle);
  };
  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.course}>
        <h2>All Course</h2>
        <button
          className={styles.addCourseBtn}
          onClick={() => setToggle(() => !toggle)}
        >
          <TbPlus size={20} />
          <span>Add Course</span>
        </button>
        {toggle ? (
          <div className={styles.addcourse}>
            <AddCourse onChange={onHandleChangeToggle} />
          </div>
        ) : null}
      </div>
      <div className={styles.cardDataGrid}>
        {data?.getMySubjectCreated.map(
          ({ subjectID, subject, image, description, language, lessons }) => (
            <Card
              key={subjectID}
              id={subjectID}
              name={subject}
              image={image}
              language={language}
              description={description}
              lessons={lessons}
            />
          )
        )}
      </div>
    </div>
  );
}
