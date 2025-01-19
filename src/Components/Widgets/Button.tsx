import { ReactNode } from "react"

export const Button = ({
  children,
}: {
  children: ReactNode
}) => {
  return <button className="hover:bg-neutral-700 transition duration-150 rounded-md">{children}</button>
}