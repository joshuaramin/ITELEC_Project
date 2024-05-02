import { gql } from "@apollo/client";

export const GetAllSubject = gql`
  query Query($take: Int!, $skip: Int!) {
    getAllSubject(take: $take, skip: $skip) {
      subjectID
      subject
      tags
      image
      language
      description
      lessonCount
      enrolledUsers
      user {
        profile {
          fullname
        }
      }
    }
  }
`;

export const GetSubjectSearch = gql`
  query GetSubjectBySearch($search: String!) {
    getSubjectBySearch(search: $search) {
      subjectID
      subject
      image
      language
      description
      enrolledUsers
    }
  }
`;

export const GetSubjectByID = gql`
  query GetSubjectById($subjectId: ID!) {
    getSubjectById(subjectID: $subjectId) {
      subjectID
      subject
      lessonCount
      image
      language
      description
      enrolledUsers
      lessons {
        lessonID
        lesson
        chapter {
          chapterID
          chapter
        }
        chapterCount
        assessmentCount
      }
      user {
        profile {
          fullname
        }
      }
      updatedAt
    }
  }
`;

export const GetMySubjectCreated = gql`
  query GetMySubjectCreated($userId: ID!) {
    getMySubjectCreated(userID: $userId) {
      subjectID
      subject
      image
      description
      language
      enrolledUsers
      lessons {
        lessonID
        lesson
      }
    }
  }
`;

export const GetMyCreatedSubject = gql`
   query GetMySubjectSearch($search: String!, $userId: ID!) {
      getMySubjectSearch(search: $search, userID: $userId) {
         subjectID
         subject
      }
   }
`;
