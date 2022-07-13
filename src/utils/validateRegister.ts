import { IRegisterCredentials } from "./../Register";
import * as errorConstant from "../constants/errors";
import { IERRORS } from "./validateLogin";

const validateRegisterForm = ({
  username,
  password,
  confirmpassword
}: IRegisterCredentials): { isFormValid: boolean; errors: IERRORS } => {
  let errors: IERRORS = {};

  let isFormValid = true;
  const {
    username: eUserName,
    password: ePassword,
    confirmpassword: econfirmpassword
  } = errorConstant.errors;

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
  if (!confirmpassword.trim()) {
    errors["confirmpassword"] = econfirmpassword.invalid;
    return { isFormValid: false, errors };
  }

  if (confirmpassword.length < 5) {
    errors["confirmpassword"] = econfirmpassword.length;
    return { isFormValid: false, errors };
  }

  if (confirmpassword !== password) {
    errors["confirmpassword"] = econfirmpassword.match;
    return { isFormValid: false, errors };
  }

  isFormValid = true;
  errors = {};

  return { isFormValid, errors };
};
export default validateRegisterForm;
