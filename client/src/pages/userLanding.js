import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';


class UserLanding extends Component {
  render() {
    const { data: { getUserById, loading, error } } = this.props;

    if (loading) return <p>Loading, please wait ...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    const { imageUrl, jwt } = getUserById;
    localStorage.setItem('token', jwt);
    localStorage.setItem('avatar', imageUrl);

    return <Redirect to='/' />;
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


