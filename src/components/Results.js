// @flow

import React from 'react';
import styled from 'styled-components';

import MediaCard from '../ui/MediaCard';

type Props = {
  data: Array<?{ image: string, name: string }>,
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;
`;

const Results = ({ data = [] }: Props) => (
  <Container>
    {data.map(dog => (
      <MediaCard
        key={dog.id}
        data-test="result"
        image={dog.image}
        title={dog.name}
      />
    ))}
  </Container>
);

export default Results;
