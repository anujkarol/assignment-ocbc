import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  LOADING,
  LOGIN,
  REGISTER,
  RETRY,
  WELCOME,
  BACK_TO_LOGIN
} from "../constants/locales";

import validateForm from "../utils/validateLogin";
import { initialLoginState } from "./state";
import { Wrapper, Title } from "./styles";
import { useClient } from "../customHooks/useClient";
import { endpoints } from "../endpoints";
import { Error } from "../components/Input/style";
import { Loader } from "../components/Loader";

export interface IUserCredentials {
  username: string;
  password: string;
}

export interface IUserError {
  [key: string]: string;
}

export const Login = (): JSX.Element => {
  const [credentials, setcCredentials] =
    useState<IUserCredentials>(initialLoginState);
  const [fieldError, setFieldError] = useState<IUserError>(initialLoginState);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const client = useClient();

  const { username, password } = credentials;

  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    let checkFormValidity = validateForm(credentials);
    const { isFormValid, errors } = checkFormValidity;
    if (!isFormValid) {
      setFieldError({
        ...fieldError,
        ...errors
      });
      setLoader(false);
      return;
    }
    debugger;
    const loginData = await client(endpoints.login, {
      method: "POST",
      data: credentials
    });

    setLoader(false);

    if (loginData.status === "failed") {
      const validationFailed = loginData.error;
      setFieldError({
        ...fieldError,
        password: "",
        username: "",
        validationFailed
      });
      return;
    }

    if (loginData.status === "success") {
      localStorage.setItem("token", loginData.token);
      navigate("/maketransfer");
      setLoader(false);
      setFieldError({});
    }
    setFieldError(initialLoginState);
    setcCredentials(initialLoginState);
  };

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setcCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Title data-testid="welcometoocbc">{WELCOME}</Title>
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

        <Button type="submit" name="login">
          {LOGIN}
        </Button>
      </form>
      <br />
      <Button type="button" name="register" handleClick={handleRegister}>
        {REGISTER}
      </Button>
    </Wrapper>
  );
};
