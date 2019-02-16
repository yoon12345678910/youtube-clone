import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Auth } from '../utils';


const UserLanding = ({
  match: {
    params: { userId }
  }
}) => {
  return (
    <Query query={USER_BY_ID} variables={{ userId }}>
      {({ data: { getUserById }, loading, error }) => {
        if (loading) return null;
        if (error) return <p>ERROR: {error.message}</p>;

        const { username, imageUrl, jwt } = getUserById;
        if (username) Auth.authenticate();
        localStorage.setItem('token', jwt);
        localStorage.setItem('avatar', imageUrl);

        return (
          <h1>Hey {username}. Welcome to You Tube Clone</h1>
        );
      }}
    </Query>
  );
}

const USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      username
      imageUrl
      jwt
    }
  }
`;

export default UserLanding;