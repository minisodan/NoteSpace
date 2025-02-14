import { StripFileNameFromPath } from "./Utils/FileManagement";
import { Button } from "./Widgets/Button";
import { IoIosClose } from "react-icons/io";

const FileListing = ({ 
  name = "", 
  onOpen = () => {}, 
  onDelete = () => {} 
}: {
  name?: string
  onOpen?: () => void
  onDelete?: () => void
}) => 
<Button className="p-1">
  <div className="flex items-center text-neutral-800 hover:text-neutral-300"> 
    <div className="text-left w-full text-neutral-300" onClick={onOpen}>{StripFileNameFromPath({path: name})}</div>
    <div className="hover:bg-neutral-800 rounded-md"><IoIosClose onClick={onDelete}/></div>
  </div>
</Button>

const Directories = ({ 
  directories, 
  onOpen = () => {},
  onDelete = () => {} 
}: { 
  directories: string[] 
  onOpen?: (dir: string) => void
  onDelete?: (dir: string) => void
}) => {
  return (
    <div className="flex flex-col m-2 gap-1">
      {directories.map((dir, i) => (
        <FileListing key={i} name={dir} onDelete={() => onDelete(dir)}/>
      ))}
    </div>
  );
};

export default Directories;
