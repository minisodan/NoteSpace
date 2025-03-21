import { GoArrowLeft } from "react-icons/go";
import { StripFileNameFromPath } from "../../Utils/FileManagement";
import { Button } from "../../Widgets/Button";

const convertDirectoryToDisplayName = (directory?: string) => {
  return directory ? StripFileNameFromPath({path: directory}) : 'NoteSpace'
}

const TopBar = ({
  directory,
  onBack
}: {
  directory: string
  onBack: () => void
}) => {
  return <div className="w-full flex gap-2 p-2">
    {directory && <Button onClick={onBack}><GoArrowLeft className="m-1" size={18} /></Button>}
    <span>{convertDirectoryToDisplayName(directory)}</span>
  </div>
}

export default TopBar;
