import { gql } from "@apollo/client";

export const NewlyCreatedSubjectByUser = gql`
   subscription Subscription($userId: ID!) {
      NewlySubjectCreatedByUser(userID: $userId) {
         subjectID
         subject
         description
         language
         image
         createdAt
         updatedAt
      }
   }
`;

export const NewlySubjectLesson = gql`
   subscription Subscription($subjectId: ID!) {
      NewlyCreatedSubjectLesson(subjectID: $subjectId) {
         lessonID
         lesson
         chapter {
            chapterID
            chapter
         }
      }
   }
`;
