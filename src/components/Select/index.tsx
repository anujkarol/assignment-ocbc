import { FormEvent, ReactNode } from "react";
import { Error, Label, Wrapper } from "../Input/style";
import { SelectComponent } from "./style";

interface ISelect extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  name: string;
  children?: ReactNode;
  label: string;
  handleChange: (e: FormEvent) => void;
  error: string;
}

export const Select = ({
  name,
  label,
  children,
  handleChange,
  error
}: ISelect): JSX.Element => {
  return (
    <Wrapper>
      <Label id={`input-${name}`} data-testid={`label-${name}`}>
        {label}
      </Label>
      <SelectComponent
        onChange={handleChange}
        defaultValue="anuj"
        name={name}
        data-testid={`select-${name}`}
      >
        {/* <option  disabled hidden>
          Select Payee Name
        </option> */}
        {children}
      </SelectComponent>
      {error && <Error data-testid={`error-${name}`}>{error}</Error>}
    </Wrapper>
  );
};
