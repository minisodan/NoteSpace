import { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState } from "react";

const TIME_DIFFERENCE_BUFFER = 1

/**
 * prop definition for ScreenOverlay
 */
interface ScreenOverlay extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	onOverlayClick?: () => void
  onChildClick?: () => void
	children: ReactNode;
}

/**
 * Creates a complete screen overlay that allows for callback functions when the overlay itself is clicked, or the child elements.
 * @param onOverlayClick callback for when the screen (outside of the child components) is clicked.
 * @param onChildClick callback for when the child components are clicked.
 * @returns ScreenOverlay element
 */
export const ScreenOverlay = ({
  children,
  onOverlayClick = () => {},
  onChildClick = () => {},
  ...props
}: ScreenOverlay) => {
  // keeps track of the timestamps of when the elements were last clicked
  const [parentClickedTimestamp, setParentClickedTimestamp] = useState<Date | undefined>(undefined)
  const [childClickedTimestamp, setChildClickedTimestamp] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (parentClickedTimestamp && !childClickedTimestamp) {
      onOverlayClick()
    } else if (parentClickedTimestamp && childClickedTimestamp) {

      // compare when both elements were last clicked, if at the same time we can determine it was the child component that was clicked.
      let temporalDifference = Math.abs(parentClickedTimestamp.getTime() - childClickedTimestamp.getTime())
      let clickFunc = temporalDifference <= TIME_DIFFERENCE_BUFFER ? onChildClick : onOverlayClick
    
      clickFunc()
    }
  }, [parentClickedTimestamp, childClickedTimestamp])

  return (
    <div 
      {...props}
      className={`fixed z-20 flex w-screen h-screen ${props.className}`}
      onClick={() => setParentClickedTimestamp(new Date())}>
      <div onClick={() => setChildClickedTimestamp(new Date())}>
        {children}
      </div>
    </div>
  )
}