import { StripFileNameFromPath } from "../Utils/FileManagement";
import { Button } from "../Widgets/Button";
import { IoIosClose } from "react-icons/io";

const Directories = ({ 
  directories, 
  onOpen = () => {},
  onDelete = () => {},
}: { 
  directories: FileType[] 
  onOpen?: (dir: FileType) => void
  onDelete?: (dir: string) => void
}) => {
  return (
    <div className="flex flex-col m-2 gap-1">
      {directories.map((dir, i) => (
        <FileListing key={i} name={dir.path} onDelete={() => onDelete(dir.path)} onOpen={() => onOpen(dir)}/>
      ))}
    </div>
  );
};

const FileListing = ({
  name = "",
  onOpen = () => {},
  onDelete = () => {},
}: {
  name?: string;
  onOpen?: () => void;
  onDelete?: () => void;
}) => (
  <Button>
    <div className="flex items-center text-neutral-800 hover:text-neutral-300 p-1">
      <div className="text-left w-full text-neutral-300" onClick={onOpen}>
        {StripFileNameFromPath({ path: name })}
      </div>
      <div className="hover:bg-neutral-800 rounded-md">
        <IoIosClose onClick={onDelete} />
      </div>
    </div>
  </Button>
);

export default Directories;
