import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Completion } from "../MakeTransferForm/Completion";
import { TRANSACTION_SUCCESS } from "../constants/locales";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

const createRouterWrapper =
  (history) =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;

test("WHEN form Page Loads THEN Status and Button Loads", () => {
  const history = createMemoryHistory();
  render(<Completion />, { wrapper: createRouterWrapper(history) });
  const status = screen.getByTestId("transaction_success");
  const btnReturn = screen.queryByTestId("btn-returntodashboard");

  expect(status).toHaveTextContent(TRANSACTION_SUCCESS);
  expect(status).toBeInTheDocument();
  expect(btnReturn).toBeInTheDocument();
});

test("WHEN button is clicked THEN page redirects to dashboard", async () => {
  const history = createMemoryHistory();
  render(<Completion />, { wrapper: createRouterWrapper(history) });

  const btnReturn = screen.queryByTestId("btn-returntodashboard");
  userEvent.click(btnReturn);
  expect(history.location.pathname).toBe("/");
});
