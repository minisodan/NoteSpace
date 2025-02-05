import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  autoFocus?: boolean;
}

/**
 * a simple styled input field
 * @returns input element
 */
export const Input = ({ ...props }: InputProps) => 
  <input 
    className="bg-stone-900 w-full border border-transparent focus:border-zinc-700 outline-none p-1" 
    {...props}
  />

