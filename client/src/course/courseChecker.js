import React from "react";
import { GetUserEnrolledSubject } from "../util/Query/enroll";
import { useQuery } from "@apollo/client";

export default function CourseChecker(courseID, userID) {
  const { loading, data, error } = useQuery(GetUserEnrolledSubject, {
    variables: {
      subjectId: courseID,
      userId: userID,
    },
  });
  return data?.getEnrolledSubjectByIDs;
}
