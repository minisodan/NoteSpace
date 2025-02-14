import { ReactNode, useState } from "react";
import { ScreenOverlay } from "./ScreenOverlay";

export const Popup = ({
  closeOnOutsideClick, 
  children
}: {
  closeOnOutsideClick?: boolean
  children?: ReactNode
}) => {
  let [showPopup, setShowPopup] = useState(true)

  return (
    showPopup && <ScreenOverlay 
      onOverlayClick={() => {if (closeOnOutsideClick) setShowPopup(false)}} 
      onChildClick={() => console.log("child!")}
      className="bg-neutral-950/60 flex justify-center items-center">
      <div className="flex items-center justify-center z-100">
        {children}
      </div>
    </ScreenOverlay>
  )
}