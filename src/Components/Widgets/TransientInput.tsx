import { useState } from "react"
import { Input, InputProps } from "./Input"

/**
 * An input component that, on focus loss, reports it's value and becomes inaccessible.
 * @param onComplete hook that reports value on focus loss
 * @returns input element
 */
export const FocusInput = ({
  onComplete = () => {}, 
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