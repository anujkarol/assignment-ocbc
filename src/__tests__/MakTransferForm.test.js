import { MemoryRouter as Router } from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { TRANSACTION_HISTORY, WELCOME } from "../constants/locales";
import { createMemoryHistory } from "history";
import { MakeTransfer } from "../MakeTransferForm";
import { server } from "../mocks/server";
import { rest } from "msw";
import { endpoints } from "../endpoints";
import { client } from "../customHooks/apiClient";

const createRouterWrapper =
  (history) =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;
const renderComponent = (component) => render(<Router>{component}</Router>);
test("WHEN form Page Loads THEN pagetitle and account holde name should be present", () => {
  const history = createMemoryHistory();
  render(<MakeTransfer />, { wrapper: createRouterWrapper(history) });
  const welcome = screen.getByTestId("welcome");
  const title = screen.getByTestId("transaction-history");
  const name = screen.getByTestId("accountholder-name");

  expect(welcome).toHaveTextContent(WELCOME);
  expect(title).toHaveTextContent(TRANSACTION_HISTORY);
  expect(name).toHaveTextContent("Anuj Karol");
});

test("WHEN form Page Loads THEN pagetitle and account holde name should be present1", () => {
  const history = createMemoryHistory();
  render(<MakeTransfer />, { wrapper: createRouterWrapper(history) });
  const welcome = screen.getByTestId("welcome");
  const title = screen.getByTestId("transaction-history");
  const name = screen.getByTestId("accountholder-name");

  expect(welcome).toHaveTextContent(WELCOME);
  expect(title).toHaveTextContent(TRANSACTION_HISTORY);
  expect(name).toHaveTextContent("Anuj Karol");
});

test("WHEN Login Button clicked THEN error fields shoudl not be on screen", async () => {
  const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;

  renderComponent(<MakeTransfer />);

  act(() => {
    client(`${baseurl}test-endpoint-transactions`);
    client(`${baseurl}test-endpoint-balances`);
  });
});
