import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Label } from "../components/Input/style";
import { Loader } from "../components/Loader";
import {
  ACCOUNT_NO,
  LOGOUT,
  MAKE_TRANSFER,
  TRANSACTION_HISTORY,
  WELCOME,
  YOU_HAVE
} from "../constants/locales";
import { useClient } from "../customHooks/useClient";
import { endpoints } from "../endpoints";
import { Title, Wrapper } from "../Login/styles";
import { LinkText } from "../Register/styles";
import { formattedNumber } from "../utils/formattedNumber";
import {
  TransactionDay,
  Date,
  Transaction,
  TransactionAccount,
  TransactionAccountNo,
  Amount,
  BalanceHolder,
  AccountHolder,
  AccountNo,
  Balance,
  Name,
  TransactionHistory
} from "./styles";

interface IRecepient {
  accountNo: string;
  accountHolder: string;
}
interface ITransactions {
  id: string;
  type: string;
  amount: number;
  currency: string;
  from: IRecepient;
  description: null | string;
  date: string;
}
const transactionHistory = (transactions: ITransactions[]) =>
  (transactions || []).map((item: any, key: number) => {
    const keyName =
      item.transactionType === "received" ? "sender" : "receipient";
    return (
      <TransactionDay key={item.id}>
        <Date>{item.transactionDate}</Date>
        <Transaction>
          <TransactionAccount>
            <span>{item[keyName]?.accountHolder}</span>
            <TransactionAccountNo>
              {item[keyName]?.accountNo}
            </TransactionAccountNo>
          </TransactionAccount>
          <Amount type={item.transactionType}>
            {item.transactionType === "transfer" ? "-" : ""}
            {formattedNumber(item.amount)}
          </Amount>
        </Transaction>
        <div>{item.description}</div>
      </TransactionDay>
    );
  });

export const MakeTransfer = (): JSX.Element => {
  const client = useClient();
  const [transactions, setTransactions] = useState();
  const [balance, setBalance] = useState();
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    const getTransactions = async () => {
      const transactionsData = await client(endpoints.transactions, {
        method: "GET"
      });
      setLoader(false);
      setTransactions(transactionsData);
    };
    getTransactions();
  }, [client]);

  useEffect(() => {
    setLoader(true);
    const getUsers = async () => {
      const balanceData = await client(endpoints.balances, {
        method: "GET"
      });

      console.log("BALANCES", balanceData);
      setLoader(false);
      setBalance(balanceData);
    };
    getUsers();
  }, [client]);

  const balanceAmount = balance ? balance["balance"] : 0;
  const transactionData = transactions ? transactions["data"] : [];

  if (loader) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <LinkText to="/">{LOGOUT}</LinkText>
      <BalanceHolder>
        <AccountHolder>
          <Label data-testid="welcome">{WELCOME}</Label>
          <Name data-testid="accountholder-name">Anuj Karol</Name>
        </AccountHolder>
        <div>
          <h3>{YOU_HAVE}</h3>
          <Balance amount={balanceAmount}>
            <b>SGD</b>&nbsp;
            {formattedNumber(balanceAmount)}
          </Balance>
        </div>

        <div>
          <AccountNo>{ACCOUNT_NO}</AccountNo>
          <div data-testid="account-number">3212-123-254</div>
        </div>
      </BalanceHolder>

      <TransactionHistory>
        <Title data-testid="transaction-history">{TRANSACTION_HISTORY}</Title>
        {transactionHistory(transactionData)}
      </TransactionHistory>
      <br />

      <LinkText to={"/transfer"}>
        <Button type="submit" name="maketransfer">
          {MAKE_TRANSFER}
        </Button>
      </LinkText>
    </Wrapper>
  );
};
