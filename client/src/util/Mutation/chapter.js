import { gql } from "@apollo/client";

export const CreateChapterLesson = gql`
  mutation CreateLessonChapter(
    $chapter: String!
    $content: String!
    $lessonId: ID!
  ) {
    createLessonChapter(
      chapter: $chapter
      content: $content
      lessonID: $lessonId
    ) {
      chapterID
      chapter
      content
      createdAt
    }
  }
`;

export const DeleteChapterLesson = gql`
  mutation DeleteLessonChapter($chapterId: ID!) {
    deleteLessonChapter(chapterID: $chapterId) {
      chapterID
      content
      chapter
    }
  }
`;
