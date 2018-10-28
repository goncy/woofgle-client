import styled from "styled-components";

const Button = styled.button`
  border: 1px solid ${({bg}) => bg || "#f0f0f0"};
  border-radius: ${({base = 4}) => base}px;
  padding: 0 ${({base = 4}) => base * 6}px;
  line-height: ${({base = 4}) => base * 16}px;
  font-size: ${({base = 4}) => base * 8}px;
  background-color: ${({bg}) => bg || "#f0f0f0"};
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.1s;

  &:disabled {
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

export default Button;
