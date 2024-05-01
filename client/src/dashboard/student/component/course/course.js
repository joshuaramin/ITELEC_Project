import React from "react";
import { GetMyEnrolledCourse } from "../../../../util/Query/enroll";
import { useQuery } from "@apollo/client";
import { DecodedToken } from "../../../../auth/token";
import Card from "./card/card";
import styles from "./course.module.scss";

export default function Course({ value }) {
  const token = DecodedToken();

  const { loading, data } = useQuery(GetMyEnrolledCourse, {
    variables: {
      userId: token,
      orderBys: value,
    },
  });

  return (
    <div className={styles.container}>
      {data?.getAllMyEnrolledSubject.map(
        ({ enrolledID, status, subject, user }) => (
          <Card
            key={enrolledID}
            status={status}
            subject={subject?.subject}
            image={subject?.image}
            description={subject?.description.slice(0, 200)}
            id={subject?.subjectID}
            author={subject?.user.profile.fullname}
          />
        )
      )}
    </div>
  );
}
