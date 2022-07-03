import styled from "styled-components";
import { Link } from "react-router-dom";
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  background: #dadade;
  padding: 24px;
  border-radius: 10px;
  justify-content: center;
  align-self: center;
  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 24px;
`;


export const LinkText = styled(Link)`
color: #000;
&:hover {
  color: #ff3333;
}
margin-bottom: 20px;
text-align: right;
`;