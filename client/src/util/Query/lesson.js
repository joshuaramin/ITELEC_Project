import { gql } from "@apollo/client";

export const GetSubjectLessonBySubjectID = gql`
   query GetAllSubjectLesson($subjectId: ID!) {
      getAllSubjectLesson(subjectID: $subjectId) {
         lessonID
         lesson
      }
   }
`;
