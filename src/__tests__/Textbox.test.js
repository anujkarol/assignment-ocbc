import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextBox } from "../components/Textbox";

test("WHEN form Page Loads THEN Input renders with correct properties", () => {
  const props = {
    name: "username",
    label: "User Name",
    value: "",
    error: true,
    handleChange: jest.fn()
  };
  render(<TextBox {...props} />);
  const inputLogin = screen.getByTestId(`input-${props.name}`);
  const labelLogin = screen.getByLabelText(`${props.label}`);
  const errorLogin = screen.queryByTestId(`error-${props.name}`);
  expect(inputLogin).toBeInTheDocument();
  expect(labelLogin).toBeInTheDocument();
  expect(errorLogin).toBeInTheDocument();
});

test("WHEN form textbox value changes THEN textbox should render correct value", () => {
  const props = {
    name: "username",
    label: "User Name",
    value: "",
    error: true,
    handleChange: jest.fn()
  };
  render(<TextBox {...props} />);
  const text = "description will com here";
  const inputLogin = screen.getByTestId(`input-${props.name}`);
  userEvent.type(inputLogin, text);
  expect(props.handleChange).toHaveBeenCalled();
  expect(props.handleChange).toHaveBeenCalledTimes(text.length);
});
