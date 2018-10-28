import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({inline}) => (inline ? "row" : "column")};

  input,
  button {
    &:not(:first-child) {
      margin-left: ${({inline}) => (inline ? 16 : 0)}px;
      margin-top: ${({inline}) => (inline ? 0 : 16)}px;
    }
  }
`;

export default Form;
