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
