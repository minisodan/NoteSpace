import {
  FileCreationMode,
  FileCreation,
  FILE_CREATION_MODE,
} from "../../FileCreation/FileCreation";
import Directories from "../../Directories/Directories";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

const FileManager = ({
  deletePath,
  directories,
  fileCreationMode,
  fileCreationKey,
  fetchedData,
  onDelete,
  onConfirm
}: {
  deletePath: string | undefined;
  directories: any[];
  fileCreationMode: FileCreationMode | undefined;
  fileCreationKey: number | null | undefined;
  fetchedData: (path: string) => void;
  onDelete?: (path: string) => void;
  onComplete?: (path: string) => void;
  onConfirm?: () => void
}) => {
  return (
    <>
      <div className="m-2">
        {fileCreationMode && (
          <FileCreation
            key={fileCreationKey}
            fileCreationMode={fileCreationMode ?? FILE_CREATION_MODE.FILE}
            onComplete={fetchedData}
          />
        )}
      </div>
      <ConfirmDialog deletePath={deletePath} onConfirm={onConfirm}/>
      <div className="flex-grow overflow-y-auto">
        <Directories directories={directories} onDelete={onDelete} />
      </div>
    </>
  );
};

export default FileManager;
