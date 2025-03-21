import { FileType } from "../Types/FileType";
import { StripFileNameFromPath } from "../Utils/FileManagement";
import { Button } from "../Widgets/Button";
import { IoIosClose } from "react-icons/io";

const FileListings = ({ 
  fileListings, 
  onOpen = () => {},
  onDelete = () => {},
}: { 
  fileListings: FileType[] 
  onOpen?: (fileType: FileType) => void
  onDelete?: (fileType: string) => void
}) => {

  const FileListings = fileListings.map((fileType, i) => (
    <FileListing key={i} 
      name={fileType.path} 
      onDelete={() => onDelete(fileType.path)} 
      onOpen={() => onOpen(fileType)}
    />
  ))

  return (
    <div className="flex flex-col m-2 gap-1">
      {FileListings}
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

export default FileListings;
