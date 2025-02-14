import { Button } from "./Button";
import { Popup } from "./Popup";

export const ConfirmationPopup = ({
  bodyText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {}
}: {
  bodyText?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}) => {  
  const buttonOptions = [
    {text: 'Yes', onClick: onConfirm}, 
    {text: 'No', onClick: onCancel}
  ]

  return (
  <Popup>
    <div className="bg-neutral-800 text-white p-2 flex flex-col gap-2">
      {bodyText}
      <div className="flex gap-2">
        {buttonOptions.map((option, i) => 
          <Button
            className="w-full"
            onClick={option.onClick}
            key={i}>
            {option.text}
          </Button>
        )}
      </div>
    </div>
  </Popup>
  )
}