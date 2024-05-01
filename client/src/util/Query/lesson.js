import { gql } from "@apollo/client";

export const GetSubjectLessonBySubjectID = gql`
  query GetAllSubjectLesson($subjectId: ID!) {
    getAllSubjectLesson(subjectID: $subjectId) {
      lessonID
      lesson
    }
  }
`;

export const GetSubjectLessonbyId = gql`
  query GetSubjectLessonID($lessonId: ID!) {
    getSubjectLessonID(lessonID: $lessonId) {
      lessonID
      lesson
      chapter {
        chapterID
        chapter
      }
    }
  }
`;
