import { GoArrowLeft } from "react-icons/go";
import { APPLICATION_PATH, stripFileNameFromPath } from "../../Utils/FileManagement";
import { Button } from "../../Widgets/Button";

const convertDirectoryToDisplayName = (directory?: string) => {
  return directory ? stripFileNameFromPath({path: directory}) : 'NoteSpace'
}

const TopBar = ({
  directory,
  onBack
}: {
  directory: string
  onBack: () => void
}) => {
  const isBackButtonDisabled = directory === APPLICATION_PATH 
  const backButtonColor = isBackButtonDisabled ? "text-neutral-800" : ""
  return (
    <div className="w-full flex gap-2 p-2">
      <Button disabled={isBackButtonDisabled} className={isBackButtonDisabled ? "hover:bg-neutral-800" : ""} onClick={onBack}>
        <GoArrowLeft className={"m-1 " + backButtonColor} size={18} />
      </Button>
      <span>
        {isBackButtonDisabled ? 'NoteSpace' : convertDirectoryToDisplayName(directory)}
      </span>
    </div>
    )
}

export default TopBar;
