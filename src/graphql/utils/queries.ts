import gql from 'graphql-tag';

export const getUsersQuery = gql`
  {
    getUsers {
      id
      username
      displayName
    }
  }
`;

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: {
        username: "test_user"
        displayName: "test_display_name"
      }
    ) {
      id
      username
      displayName
    }
  }
`;
