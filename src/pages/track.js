import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, QueryResult } from '../components';
import TrackDetail from '../components/track-detail';

export const GET_TRACK = gql`
query Query($trackId: ID!) {
    Track(id: $trackId) {
      id
      title
      author {
        name
        photo
      }
      thumbnail
      durationInSeconds
      modulesCount
      description
      numberOfViews
      modules {
        title
        durationInSeconds
        id
      }
    }
  }
`;

const Track = ({ trackId }) => {
    const { loading, error, data } = useQuery(GET_TRACK, {
        variables: { trackId }
    });
    return (
        <Layout>
            <QueryResult error={error} loading={loading} data={data}>
            <TrackDetail track={data?.Track} />
            </QueryResult>
        </Layout>
    );
}

export default Track;