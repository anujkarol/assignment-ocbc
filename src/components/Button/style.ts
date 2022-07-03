import styled from "styled-components";

export const BaseButton = styled.button`
  background: ${(props) => {
    return "#ff3333";
  }};
  color: #fff;
  border: 0;
  border-bottom: 2px solid #ad0c00;
  box-shadow: none;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: #ad0c00;
  }
`;
