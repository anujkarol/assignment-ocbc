import styled from "styled-components";

export const Message = styled.h2`
  text-align: center;
  margin-bottom: 48px;
`;

export const BalanceHolder = styled.div`
  background: #fff;
  padding: 24px;
  position: fixed;
  left: 0;
  top:0;
  min-width: 300px;
  border-radius:
  display:flex;
  flex-direction:column;
  border-bottom-right-radius: 25px;
  @media (max-width: 768px) {
    position:static;
    border-radius:0;
    margin-bottom:10px;
  }
`;
export const AccountHolder = styled.div`
  color: ##ff0000;
`;

export const AccountNo = styled.p`
  color: #ccc;
`;
export const Balance = styled.h2<{ amount: number | {} }>`
  color: ${(props) => (props.amount > 0 ? "green" : "red")};
  margin: 10px 0;
`;
export const Name = styled.h1`
  margin: 20px 0;
`;

export const TransactionHistory = styled.div`
  background: #fff;
  padding: 24px;
  margin: 24px;
  max-height: calc((100vh - 260px) - 30vh);
  overflow-y: auto;
`;
export const TransactionDay = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;
export const DateWrapper = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  padding: 5px 0;
  font-size: 14px;
`;

export const Transaction = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
export const Amount = styled.div<{ type: string }>`
  color: ${(props) => (props.type === "transfer" ? "red" : "green")};
`;
export const TransactionAccount = styled.div`
  flex-grow: 3;
`;
export const TransactionAccountNo = styled.div`
  font-size: 12px;
`;
