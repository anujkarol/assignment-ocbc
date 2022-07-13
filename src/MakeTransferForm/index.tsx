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
  DateWrapper,
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

interface ITransactions extends IRecepient {
  id: string;
  transactionType: string;
  amount: number;
  description: null | string;
  transactionDate: string;
  [key: string]: any;
}

const transactionHistory = (transactions: ITransactions[]) =>
  (transactions || []).map((item: ITransactions, key: number) => {
    const keyName =
      item.transactionType === "received" ? "sender" : "receipient";

    const newDate = new Date(item.transactionDate);
    return (
      <TransactionDay key={item.id}>
        <DateWrapper>{newDate.toLocaleDateString()}</DateWrapper>
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

interface IBalance {
  accountNo: string;
  balance: number;
  status: "success" | "failed";
}

export const MakeTransfer = (): JSX.Element => {
  const client = useClient();
  const [transactions, setTransactions] = useState();
  const [balance, setBalance] = useState<IBalance>({
    accountNo: "",
    balance: 0,
    status: "success"
  });
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
      setLoader(false);
      setBalance(balanceData);
    };
    getUsers();
  }, [client]);

  const balanceAmount = balance["balance"];
  const accountNo = balance["accountNo"];
  const transactionData = transactions ? transactions["data"] : [];
  const username = localStorage.getItem("username");

  if (loader) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <LinkText to="/">{LOGOUT}</LinkText>
      <BalanceHolder>
        <AccountHolder>
          <Label data-testid="welcome">{WELCOME}</Label>
          <Name data-testid="accountholder-name">{username}</Name>
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
          <div data-testid="account-number">{accountNo}</div>
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
