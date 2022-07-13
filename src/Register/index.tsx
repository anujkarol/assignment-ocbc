import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Error } from "../components/Input/style";
import { Loader } from "../components/Loader";
import {
  BACK_TO_LOGIN,
  REGISTER,
  REGISTER_TO_OCBC
} from "../constants/locales";
import { useClient } from "../customHooks/useClient";
import { endpoints } from "../endpoints";
import { IUserCredentials } from "../Login";
import { IERRORS } from "../utils/validateLogin";
import validateRegisterForm from "../utils/validateRegister";
import { initialRegisterState } from "./state";
import { LinkText, Title, Wrapper } from "./styles";

export interface IRegisterCredentials extends IUserCredentials {
  confirmpassword: string;
}
export const Register = () => {
  const [credentials, setcCredentials] =
    useState<IRegisterCredentials>(initialRegisterState);
  const [fieldError, setFieldError] = useState<IERRORS>(initialRegisterState);
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const client = useClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let checkFormValidity = validateRegisterForm(credentials);
    const { isFormValid, errors } = checkFormValidity;
    if (!isFormValid) {
      setFieldError({
        ...fieldError,
        ...errors
      });
      setLoader(false);
      return;
    }
    const registerData = await client(endpoints.register, {
      method: "POST",
      data: {
        username: credentials.username,
        password: credentials.password
      }
    });

    setLoader(false);

    if (registerData.status === "failed") {
      const validationFailed = registerData.error;
      setFieldError({
        ...fieldError,
        password: "",
        username: "",
        validationFailed
      });
      return;
    }

    if (registerData.status === "success") {
      localStorage.setItem("token", registerData.token);
      navigate("/login");
      setLoader(false);
      setFieldError({});
    }
    setFieldError(initialRegisterState);
    setcCredentials(initialRegisterState);
  };

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setcCredentials({
      ...credentials,
      [name]: value
    });
  };

  const { username, password, confirmpassword } = credentials;

  if (loader) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <LinkText to="/">{BACK_TO_LOGIN}</LinkText>
      <Title data-testid="page-regsiter">{REGISTER_TO_OCBC}</Title>
      {fieldError.validationFailed && (
        <Error data-testid="server-validation">
          {fieldError.validationFailed}
        </Error>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          label="User Name"
          value={username}
          handleChange={handleChange}
          error={fieldError["username"]}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={handleChange}
          error={fieldError["password"]}
        />

        <Input
          type="password"
          name="confirmpassword"
          label="Confirm Password"
          value={confirmpassword}
          handleChange={handleChange}
          error={fieldError["confirmpassword"]}
        />
        <Button type="submit" name="register">
          {REGISTER}
        </Button>
      </form>
    </Wrapper>
  );
};
