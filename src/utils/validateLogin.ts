import { IUserCredentials } from "../Login/index";
import * as errorConstant from "../constants/errors";

export type IERRORS = {
  [key: string]: string;
};
const validateForm = ({
  username,
  password
}: IUserCredentials): { isFormValid: boolean; errors: IERRORS } => {
  let errors: IERRORS = {}; // use const

  const { username: eUserName, password: ePassword } = errorConstant.errors;

  if (!username.trim()) {
    errors["username"] = eUserName.empty;

    return { isFormValid: false, errors };
  }

  if (!password.trim()) {
    errors["password"] = ePassword.invalid;
    return { isFormValid: false, errors };
  }
  if (password.length < 5) {
    errors["password"] = ePassword.length;
    return { isFormValid: false, errors };
  }

  return { isFormValid: true, errors: {} };
};
export default validateForm;
