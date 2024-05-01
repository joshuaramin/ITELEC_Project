import { gql } from "@apollo/client";

export const AddNewSubject = gql`
  mutation Mutation(
    $file: Upload!
    $userId: ID!
    $categoryId: ID!
    $input: subjectInput
  ) {
    createSubject(
      file: $file
      userID: $userId
      categoryID: $categoryId
      input: $input
    ) {
      subjectID
      subject
      language
    }
  }
`;

export const DeleteSubject = gql`
  mutation DeleteSubject($subjectId: ID!) {
    deleteSubject(subjectID: $subjectId) {
      subjectID
      subject
    }
  }
`;

export const UpdateSubjectTitle = gql`
  mutation UpdateSubjectTitle($subject: String!, $subjectId: ID!) {
    updateSubjectTitle(subject: $subject, subjectID: $subjectId) {
      subjectID
    }
  }
`;

export const UpdateDescription = gql`
  mutation UpdateSubjectDescription($subjectId: ID!, $description: String!) {
    updateSubjectDescription(subjectID: $subjectId, description: $description) {
      subjectID
    }
  }
`;
