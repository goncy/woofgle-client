// @flow
import type {Node} from "react";

import React from "react";
import styled from "styled-components";

type Props = {
  image: string,
  title: string,
  action: ?Node,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 400px;
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
`;

const Title = styled.span`
  position: absolute;
  bottom: 16px;
  right: 16px;
  text-align: right;
  color: white;
  line-height: 1;
  font-size: 48px;
  text-shadow: 1px 1px black, -1px -1px grey;
  font-family: "Patrick Hand";
  text-transform: capitalize;
`;

const Action = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const MediaCard = ({image, title, action, ...props}: Props) => (
  <Container src={image} {...props}>
    {action && <Action>{action}</Action>}
    <Title>{title}</Title>
  </Container>
);

export default MediaCard;
