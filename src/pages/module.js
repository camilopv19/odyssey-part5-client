import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, QueryResult, ModuleDetail } from '../components';

/**
 * GET_MODULE_AND_PARENT_TRACK gql query to retrieve a specific module and its parent track,
 * both needed for the ModuleDetail component
 */
export const GET_MODULE_AND_PARENT_TRACK = gql`
query Query($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      durationInSeconds
      content
      videoUrl
    }
    Track(id: $trackId) {
      id
      title
      modules {
        id
        title
        durationInSeconds
      }
    }
  }
`;

const Module = ({ trackId, moduleId }) => {
    const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
        variables: { trackId, moduleId }
    });
    console.log(data);
    return (
        <Layout>
            <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.Track} module={data?.module} />
            </QueryResult>
        </Layout>
    );
}

export default Module;