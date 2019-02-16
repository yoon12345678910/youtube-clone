import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const Home = () => {
  return (
    <Query query={ALL_USERS}>
      {({ data: { allUsers }, loading, error }) => {
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
      }}
    </Query>
  );
};

const ALL_USERS = gql`
  query {
    allUsers {
      id
      username
      email
      googleId
      imageUrl
      createOn
      videos
    }
  }
`;

export default Home;