import React from "react";
import Card from "../../components/card/card";
import { useQuery } from "@apollo/client";
import { GetAllSubject } from "../../util/Query/subject";

export default function Course({ styles }) {
  const { data, loading } = useQuery(GetAllSubject, {
    variables: {
      take: 10,
      skip: 0,
    },
  });

  return (
    <div className={styles.courses}>
      <div className={styles.courseTitle}>
        <h2>Top Course</h2>
      </div>
      <div className={styles.cardGrid}>
        {loading
          ? "Loading"
          : data?.getAllSubject.map(
              ({
                subjectID,
                subject,
                user,
                lessonCount,
                tags,
                image,
                description,
              }) => (
                <Card
                  key={subjectID}
                  id={subjectID}
                  name={subject}
                  image={image}
                  author={user.profile.fullname}
                  count={lessonCount}
                  tags={tags}
                />
              )
            )}
      </div>
    </div>
  );
}
