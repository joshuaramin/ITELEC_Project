import { gql } from "@apollo/client";

export const LOGINAUTHENTICATIOn = gql`
   mutation Mutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
         token
      }
   }
`;

export const UsernameAvailability = gql`
   mutation CheckUsernameAvailability($username: String!) {
      checkUsernameAvailability(username: $username) {
         username
      }
   }
`;

export const REGISTER = gql`
   mutation CreateUserAccount($role: userRoles, $user: userInput) {
      createUserAccount(role: $role, user: $user) {
         username
         email
      }
   }
`;
