import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { server } from "../mocks/server";
import { Register } from "../Register";
import { client } from "../customHooks/apiClient";

const renderComponent = (component) => render(<Router>{component}</Router>);
test("WHEN select loads THEN select renders with correct properties", async () => {
  const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;
  const data = {
    username: "ocbc",
    password: "123456",
    confirmpassword: "123456"
  };
  const endpoint = "test-endpoint1";
  server.use(
    rest.post(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          description: "user Registered"
        })
      );
    })
  );

  renderComponent(<Register />);

  const btnRegister = screen.getByTestId("btn-register");
  const inputRegister = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");
  const inputconfirmPassword = screen.getByTestId("input-confirmpassword");

  userEvent.type(inputRegister, data.username);
  userEvent.type(inputPassword, data.password);
  userEvent.type(inputconfirmPassword, data.password);
  userEvent.click(btnRegister);

  await client(endpoint, { data });

  expect(screen.queryByTestId("error-username")).not.toBeInTheDocument();
  expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  expect(screen.queryByTestId("error-confirmpassword")).not.toBeInTheDocument();
  expect(screen.queryByTestId("server-validation")).not.toBeInTheDocument();
});

test("WHEN select loads THEN select renders with correct properties1", async () => {
  const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;
  const data = {
    username: "",
    password: "123456",
    confirmpassword: "123456"
  };
  const endpoint = "test-endpoint1";
  server.use(
    rest.post(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      return res(
        ctx.json({
          status: "success",
          description: "user Registered"
        })
      );
    })
  );

  renderComponent(<Register />);

  const btnRegister = screen.getByTestId("btn-register");
  const inputRegister = screen.getByTestId("input-username");
  const inputPassword = screen.getByTestId("input-password");
  const inputconfirmPassword = screen.getByTestId("input-confirmpassword");

  userEvent.type(inputRegister, data.username);
  userEvent.type(inputPassword, data.password);
  userEvent.type(inputconfirmPassword, data.password);
  userEvent.click(btnRegister);

  await client(endpoint, { data });

  expect(screen.getByTestId("error-username")).toBeInTheDocument();
  expect(screen.queryByTestId("error-password")).not.toBeInTheDocument();
  expect(screen.queryByTestId("error-confirmpassword")).not.toBeInTheDocument();
  expect(screen.queryByTestId("server-validation")).not.toBeInTheDocument();
});
