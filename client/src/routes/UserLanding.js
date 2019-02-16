import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer, graphql } from 'react-apollo';


class UserLanding extends Component {
  render() {
    const { data: { getUserById, loading, error } } = this.props;

    if (loading) return null;
    if (error) return <p>ERROR: {error.message}</p>;

    const { username, imageUrl, jwt } = getUserById;

    localStorage.setItem('token', jwt);
    localStorage.setItem('avatar', imageUrl);

    return (
      <ApolloConsumer>
        {client => {
          client.writeData({ data: { isLoggedIn: true } });
          return (
            <h1>Hey {username}. Welcome to You Tube Clone</h1>
          )
        }}
      </ApolloConsumer>
    )
  }
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

export default graphql(USER_BY_ID, {
  options: props => ({ variables: { userId: props.match.params.userId }})
})(UserLanding);