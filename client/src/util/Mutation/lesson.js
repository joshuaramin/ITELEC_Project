import { gql } from "@apollo/client";

export const CreateSubjectLesson = gql`
  mutation CreateSubjectLesson($lesson: String!, $subjectId: ID!) {
    createSubjectLesson(lesson: $lesson, subjectID: $subjectId) {
      lessonID
      lesson
    }
  }
`;

export const UpdateSubjectLesssonTitle = gql`
  mutation UpdateSubjectLessonTitle($lessonId: ID!, $lesson: String!) {
    updateSubjectLessonTitle(lessonID: $lessonId, lesson: $lesson) {
      lessonID
      lesson
    }
  }
`;

export const DeleteSubjectLesson = gql`
  mutation DeleteSubjectLesson($lessonId: ID!) {
    deleteSubjectLesson(lessonID: $lessonId) {
      lessonID
      lesson
    }
  }
`;
