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

export const FindMyUniqueEmailAddress = gql`
  mutation FindMyEmailAddress($email: String!) {
    findMyEmailAddress(email: $email) {
      userID
    }
  }
`;

export const AccountVerification = gql`
  mutation UpdateVerfiedAccount($userId: ID!) {
    updateVerfiedAccount(userID: $userId) {
      userID
    }
  }
`;

export const RESETPASSWORD = gql`
  mutation ResetUserPassword(
    $password: String!
    $userId: ID!
    $retype: String!
  ) {
    resetUserPassword(password: $password, userID: $userId, retype: $retype) {
      userID
    }
  }
`;
