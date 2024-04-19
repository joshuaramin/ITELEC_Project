import { gql } from "@apollo/client";

export const CreateSubjectLesson = gql`
   mutation CreateSubjectLesson($lesson: String!, $subjectId: ID!) {
      createSubjectLesson(lesson: $lesson, subjectID: $subjectId) {
         lessonID
         lesson
      }
   }
`;
