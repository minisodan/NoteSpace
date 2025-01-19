import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="hover:bg-neutral-700 transition duration-150 rounded-md"
      {...props}
    >
      {children}
    </button>
  );
};
