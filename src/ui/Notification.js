import styled from "styled-components";

const Notification = styled.div`
  cursor: pointer;
  position: fixed;
  top: 16px;
  left: 16px;
  background-color: ${({color}) => color || "gainsboro"};
  color: rgba(0, 0, 0, 0.4);
  padding: 24px;
  width: fit-content;
  margin: auto;
  border-radius: 4px;
  font-size: 24px;
`;

export default Notification;
