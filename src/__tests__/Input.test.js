import { render, screen } from "@testing-library/react";
import { Input } from "../components/Input";

test("WHEN form Page Loads THEN Input renders with correct properties", () => {
  const props = {
    type: "text",
    name: "username",
    label: "User Name",
    value: "",
    error: true,
    handleClick: jest.fn()
  };
  render(<Input {...props} />);
  const inputLogin = screen.getByTestId(`input-${props.name}`);
  const labelLogin = screen.getByLabelText(`${props.label}`);
  const errorLogin = screen.queryByTestId(`error-${props.name}`);
  expect(inputLogin).toBeInTheDocument();
  expect(labelLogin).toBeInTheDocument();
  expect(errorLogin).toBeInTheDocument();
});
