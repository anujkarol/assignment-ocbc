import { ReactNode } from "react";
import { BaseButton } from "./style";

type Size = "small" | "medium" | "large";
type Priority = "primary" | "secondary" | "link";

interface IBUtton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  children: ReactNode;
  size?: Size;
  disabled?: boolean;
  priority?: Priority;
  handleClick?: () => void;
}

export const Button = ({
  children,
  type = "submit",
  name,
  handleClick
}: IBUtton): JSX.Element => {
  return (
    <BaseButton type={type} data-testid={`btn-${name}`} onClick={handleClick}>
      {children}
    </BaseButton>
  );
};
