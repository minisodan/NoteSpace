import { useState } from "react"
import { Input, InputProps } from "./Input"

/**
 * An input box that destroys itself then reports it's value on focus loss. 
 * @param onComplete hook that reports value when destroyed
 * @returns input element
 */
export const FocusInput = ({
  onComplete = (input: string) => {}, 
  ...props
}: {
  onComplete?: (input: string) => void
} & InputProps
) => {
	const [inputText, setInputText] = useState('')
	const [isFocused, setIsFocused] = useState(true)

  const complete = () => {
    onComplete(inputText)
    setIsFocused(false)
  }

	return (isFocused &&
    <Input 
    {...props}
      autoFocus
      value={inputText}
      onChange={e => setInputText(e.target.value)}
      onBlur={complete}
      onKeyDown={e => {if (e.key === 'Enter') complete()}}
    />
  )
}