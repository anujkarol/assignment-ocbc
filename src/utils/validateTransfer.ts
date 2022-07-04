import * as errorConstant from "../constants/errors";

interface IValidateTransfer {
  receipientAccountNo: string;
  amount: string;
  description: string;
  date: string;
}

type IERRORS = {
  [key: string]: string;
};

const validateTransfer = (
  transferValue: IValidateTransfer
): { isFormValid: boolean; errors: IERRORS } => {
  let errors: IERRORS = {};

  const { recepient, amount, date } = errorConstant.errors;

  let isFormValid = true;

  if (!transferValue.receipientAccountNo) {
    errors["receipientAccountNo"] = recepient.empty;
    isFormValid = false;
  }
  if (!transferValue.amount) {
    errors["amount"] = amount.empty;
    isFormValid = false;
  } else {
    isFormValid = true;
  }
  if (!transferValue.date) {
    errors["date"] = date.empty;
    isFormValid = false;
  }
  return { isFormValid, errors };
};
export default validateTransfer;
