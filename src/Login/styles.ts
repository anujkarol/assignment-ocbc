import styled from "styled-components";
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
