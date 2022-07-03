import styled from "styled-components";

export const TextComponent = styled.textarea`
  display: flex;
  box-shadow: none;
  border: 0;
  border-bottom: 1px solid #ccc;
  height: 40px;
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  color: #000;
  padding: 0 10px;
  &:focus-visible {
    border-bottom: 2px solid #ccc;
    box-shadow: none;
    outline: none;
  }
`;
