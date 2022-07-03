import { FormEvent } from "react";
import { Error, Label, Wrapper } from "../Input/style";
import { TextComponent } from "./style";

interface ITextbox extends React.ButtonHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;
  handleChange: (e: FormEvent) => void;
  label: string;
  row?: number;
  error: string;
}

export const TextBox = ({
  name,
  label,
  value,
  handleChange,
  error
}: ITextbox): JSX.Element => {
  return (
    <Wrapper>
      <Label id={`input-${name}`} data-testid={`label-${name}`}>
        {label}
      </Label>
      <TextComponent
        aria-labelledby={`input-${name}`}
        autoComplete="off"
        name={name}
        data-testid={`input-${name}`}
        value={value}
        onChange={handleChange}
      />
      {error && <Error data-testid={`error-${name}`}>{error}</Error>}
    </Wrapper>
  );
};
