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


export const NewlyChapterLesson = gql`subscription NewlyLessonChapterSubscription($lessonId: ID!) {
   NewlyLessonChapterSubscription(lessonID: $lessonId) {
     chapterID
     content
     chapter
     createdAt
   }
 }`