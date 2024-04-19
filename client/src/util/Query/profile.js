import { gql } from "@apollo/client";

export const ProfileById = gql`
   query GetUserProfileById($userId: ID!) {
      getUserProfileById(userID: $userId) {
         fullname
         user {
            role
         }
      }
   }
`;
