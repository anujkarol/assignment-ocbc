import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { TextBox } from "../components/Textbox";
import validateTransfer from "../utils/validateTransfer";
import { LOGOUT, TRANSFER_MONEY, TRANSFER_NOW } from "../constants/locales";
import { endpoints } from "../endpoints";
import { initialTransferState } from "./state";
import { Wrapper } from "../Login/styles";
import { LinkText, Title } from "../Register/styles";
import { useClient } from "../customHooks/useClient";
import { Error } from "../components/Input/style";

export interface ITransferState {
  amount: any;
  description: string;
  recipientAccountNo: string;
  date: string;
}

export interface ITranIPayeenamesState {
  accountHolderName: string;
  accountNo: number;
  id: string;
}

export interface ITransferError {
  [key: string]: string;
}

export const Transfer = (): JSX.Element => {
  const [transfer, setTransfer] =
    useState<ITransferState>(initialTransferState);
  const [payeeNames, setpayeeNames] = useState();

  const [fieldError, setFieldError] =
    useState<ITransferError>(initialTransferState);

  const navigate = useNavigate();
  const client = useClient();

  useEffect(() => {
    const getPayeeData = async () => {
      const payeeNames = await client(endpoints.payee, {
        method: "GET"
      });
      setpayeeNames(payeeNames.data);
    };
    getPayeeData();
  }, [client]);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    debugger;

    let checkFormValidity = validateTransfer(transfer);

    const { isFormValid, errors } = checkFormValidity;

    if (!isFormValid) {
      setFieldError({
        ...fieldError,
        ...errors
      });
      return;
    }

    const { recipientAccountNo, amount, description, date } = transfer;

    const newData = {
      recipientAccountNo,
      amount: +amount,
      description,
      date
    };

    const getData = await client(endpoints.transfer, {
      method: "POST",
      data: newData
    });

    if (getData.status === "failed") {
      const validationFailed = getData.description;
      setFieldError({
        ...fieldError,
        description: "",
        amount: "",
        recipientAccountNo: "",
        date: "",
        validationFailed
      });
      return;
    }

    if (getData.status === "success") {
      navigate("/completion");
      setFieldError({});
    }
  };

  const getPayees = (payeeNames || []).map((payee: any, index: number) => {
    return (
      <option value={payee.accountNo} key={index} data-testid="select-option">
        {payee.accountNo} | {payee.accountHolderName}
      </option>
    );
  });

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    setTransfer({
      ...transfer,
      [name]: value
    });
  };

  const { recipientAccountNo, amount, date, description } = transfer;

  return (
    <Wrapper>
      <LinkText to="/">{LOGOUT}</LinkText>
      <Title>{TRANSFER_MONEY}</Title>
      {fieldError.validationFailed && (
        <Error data-testid="server-validation">
          {fieldError.validationFailed}
        </Error>
      )}
      <form onSubmit={handleTransfer}>
        <Select
          name="recipientAccountNo"
          label="Select Payee Name"
          handleChange={handleChange}
          value={recipientAccountNo}
          error={fieldError["recipientAccountNo"]}
        >
          {getPayees}
        </Select>

        <Input
          type="number"
          name="amount"
          label="Amount"
          value={amount}
          handleChange={handleChange}
          error={fieldError["amount"]}
        />

        <Input
          type="date"
          name="date"
          label="Date"
          value={date}
          handleChange={handleChange}
          error={fieldError["date"]}
        />

        <TextBox
          name="description"
          label="Description"
          value={description}
          handleChange={handleChange}
          row={30}
          error={fieldError["password"]}
        />

        <Button type="submit" name="transfer">
          {TRANSFER_NOW}
        </Button>
      </form>
    </Wrapper>
  );
};