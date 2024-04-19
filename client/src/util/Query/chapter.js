import { gql } from "@apollo/client";

export const GetAllChapterBylessonID = gql`
   query GetAllChapterByLessonID($lessonId: ID!) {
      getAllChapterByLessonID(lessonID: $lessonId) {
         chapterID
         chapter
         content
      }
   }
`;

export const GetChapterById = gql`
   query GetLessonChapter($chapterId: ID!) {
      getLessonChapter(chapterID: $chapterId) {
         chapter
         content
      }
   }
`;
