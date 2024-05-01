import { gql } from "@apollo/client";



export const CreateSubjectEnroll = gql`mutation Mutation($userId: ID!, $subjectId: ID!) {
    createSubjectEnroll(userID: $userId, subjectID: $subjectId) {
      enrollID
      createdAt
    }
  }`