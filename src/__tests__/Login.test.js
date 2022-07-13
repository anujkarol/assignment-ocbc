import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { server } from "../mocks/server";
import { Login } from "../Login";
import { client } from "../customHooks/apiClient";
import { endpoints } from "../endpoints";

const renderComponent = (component) => render(<Router>{component}</Router>);

test("WHEN app Loads THEN Login Page render", () => {
  renderComponent(<Login />);
  const inputLogin = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");
  const btnLogin = screen.getByTestId("btn-login");

  expect(inputLogin).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(btnLogin).toBeInTheDocument();
  expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  expect(screen.queryByTestId("error-username")).not.toBeInTheDocument();
});

test("WHEN input value changes THEN handlchange event is called", () => {
  renderComponent(<Login />);
  const inputLogin = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");

  userEvent.type(inputLogin, "ocbc");
  userEvent.type(inputPassword, "12345678");

  expect(inputLogin).toHaveValue("ocbc");
  expect(inputPassword).toHaveValue("12345678");
});

test("WHEN Login Button clicked THEN error fields should not be on screen", async () => {
  const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;
  const data = { username: "ocbc", password: "123456" };
  const endpoint = "test-endpoint1";

  server.use(
    rest.post(`${baseurl}${endpoints.login}`, async (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          status: "failed",
          error: "user not found"
        })
      );
    })
  );

  renderComponent(<Login />);

  const btnLogin = screen.getByTestId("btn-login");
  const inputLogin = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");

  userEvent.type(inputLogin, data.username);
  userEvent.type(inputPassword, data.password);
  userEvent.click(btnLogin);

  await act(() => {
    client(endpoint, { data }).catch((e) => e);
  });
  await waitFor(() => {
    expect(screen.getByTestId("server-validation")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.queryByTestId("error-username")).not.toBeInTheDocument();
  });
});

test("WHEN Login Button clicked with missing input data THEN error fields should be displayed", async () => {
  renderComponent(<Login />);
  const btnLogin = screen.getByTestId("btn-login");
  const inputLogin = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");

  userEvent.type(inputLogin, "");
  userEvent.type(inputPassword, "");
  userEvent.click(btnLogin);

  expect(screen.getByTestId("error-username")).toBeInTheDocument();
  expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  expect(screen.queryByTestId("server-validation")).not.toBeInTheDocument();
});

test("WHEN Lofin Button clicked THEN error fields should not be on screen1", async () => {
  const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;
  const data = { username: "ocbc", password: "123456" };
  const endpoint = "test-endpoint1";
  server.use(
    rest.post(`${baseurl}${endpoints.login}`, async (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          status: "failed",
          error: "user not found"
        })
      );
    })
  );

  renderComponent(<Login />);
  const btnLogin = screen.getByTestId("btn-login");
  const inputLogin = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");

  userEvent.type(inputLogin, data.username);
  userEvent.type(inputPassword, data.password);
  userEvent.click(btnLogin);

  await client(endpoint).catch((e) => e);
  expect(screen.getByTestId("server-validation")).toBeInTheDocument();
  expect(screen.getByTestId("server-validation")).toHaveTextContent(
    "user not found"
  );
  expect(screen.queryByTestId("error-username")).not.toBeInTheDocument();
  expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
});
