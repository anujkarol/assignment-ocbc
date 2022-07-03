import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 24px 0;
`;

export const Label = styled.label`
  margin-bottom: 10px;
`;

export const Error = styled.p`
  margin-bottom: 10px;
  color: #ff3333;
  font-size: 12px;
  margin-top: 10px;
`;
export const InputComponent = styled.input`
  display: flex;
  box-shadow: none;
  border: 0;
  border-bottom: 1px solid #ccc;
  height: 40px;
  width: 100%;
  color: #000;
  padding: 0 10px;
  &:focus-visible {
    border-bottom: 2px solid #ccc;
    box-shadow: none;
    outline: none;
  }
`;
