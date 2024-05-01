import { gql } from "@apollo/client";

export const GetUserEnrolledSubject = gql`
  query GetEnrolledSubjectByIDs($subjectId: ID!, $userId: ID!) {
    getEnrolledSubjectByIDs(subjectID: $subjectId, userID: $userId)
  }
`;

export const GetMyEnrolledCourse = gql`
  query Query($userId: ID!, $orderBys: String!) {
    getAllMyEnrolledSubject(userID: $userId, orderBys: $orderBys) {
      enrollID
      status
      subject {
        subjectID
        subject
        description
        image
        user {
          profile {
            fullname
          }
        }
      }
    }
  }
`;
