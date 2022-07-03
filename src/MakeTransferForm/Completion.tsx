import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { LOGOUT, TRANSACTION_SUCCESS } from "../constants/locales";
import { Wrapper } from "../Login/styles";
import { LinkText } from "../Register/styles";
import { Message } from "./styles";

export const Completion = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/maketransfer");
  };
  return (
    <Wrapper>
      <LinkText to="/">{LOGOUT}</LinkText>
      <Message data-testid="transaction_success">{TRANSACTION_SUCCESS}</Message>

      <Button type="button" handleClick={handleClick} name="returntodashboard">
        Return to Dashboard
      </Button>
    </Wrapper>
  );
};
