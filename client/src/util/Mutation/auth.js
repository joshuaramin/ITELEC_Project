import { gql } from "@apollo/client";

export const LOGINAUTHENTICATIOn = gql`
   mutation Mutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
         token
      }
   }
`;
