import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "../components/Select";

test("WHEN select loads THEN select renders with correct properties", () => {
  const options = <option>payee name 1</option>;
  const props = {
    name: "payee",
    label: "Payee Name",
    children: options,
    error: true,
    handleChange: jest.fn()
  };
  render(<Select {...props} />);
  expect(screen.getByTestId(`select-${props.name}`)).toHaveTextContent(
    "payee name 1"
  );
});
test("WHEN select value changes THEN select renders with correct value", () => {
  const text = ["payee name 1", "payee name 2", "payee name 3"];
  const options = text.map((option, key) => {
    return (
      <option key={Math.random()} data-testid="select-option">
        {option}
      </option>
    );
  });
  const props = {
    name: "payee",
    label: "Payee Name",
    children: options,
    error: true,
    handleChange: jest.fn()
  };
  render(<Select {...props} />);

  userEvent.selectOptions(screen.getByTestId(`select-${props.name}`), [
    screen.getByText("payee name 2")
  ]);
  expect(screen.getByRole("option", { name: "payee name 1" }).selected).toBe(
    false
  );
  expect(screen.getByRole("option", { name: "payee name 2" }).selected).toBe(
    true
  );
});
