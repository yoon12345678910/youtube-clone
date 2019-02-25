import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class Home extends Component {
  render () {
    const { data: { allUsers, loading, error } } = this.props;

    if (loading) return null;
    if (error) return <p>ERROR: {error.message}</p>;
    
    return (
      <div>
        {allUsers.map(u => (
          <div key={u.id}>
            <h3>{u.username}</h3>
            <h3>{u.email}</h3>
            <h3>{u.createdOn}</h3>
            <img src={u.imageUrl} alt={'userimage'} />
          </div>
        ))}
      </div>
    );
  }
}

const ALL_USERS = gql`
  query {
    allUsers {
      id
      username
      email
      imageUrl
      createdOn
    }
  }
`;

export default graphql(ALL_USERS)(Home);